"use client";

import { motion } from "framer-motion";
import { FaBoxes, FaMoneyBillWave, FaUsers, FaChartLine } from "react-icons/fa";
import { useProductStore } from "@/stores/useProductStore";
import { useTransactionStore } from "@/stores/useTransactionStore";
import { suppliers } from "@/data/suppliers";
import { useEffect, useState } from "react";
import { buildPromptAnalysis, generate } from "@/lib/gemini";
import { marked } from 'marked';
import { toast } from "react-toastify";

export default function AdminDashboard() {
	const { products } = useProductStore();
	const { transactions } = useTransactionStore();
	const [analysis, setAnalysis] = useState(null);
	const [loading, setLoading] = useState(false);
	const [clientRendered, setClientRendered] = useState(false);

	const [totalSales, setTotalSales] = useState(0);
	const [completedTransactions, setCompletedTransactions] = useState(0);
	const [lowStockProducts, setLowStockProducts] = useState(0);

	useEffect(() => {
		setClientRendered(true); 

		const computedTotalSales = transactions.reduce(
			(sum, t) => sum + t.subtotal,
			0
		);
		const computedCompletedTransactions = transactions.filter(
			(t) => t.status === "completed"
		).length;
		const computedLowStockProducts = products.filter(
			(p) => p.stock < 10
		).length;

		setTotalSales(computedTotalSales);
		setCompletedTransactions(computedCompletedTransactions);
		setLowStockProducts(computedLowStockProducts);
	}, [transactions, products]);

	const stats = [
		{
			title: "Total Products",
			value: products.length,
			icon: <FaBoxes />,
			color: "bg-blue-100 text-blue-600",
		},
		{
			title: "Total Sales",
			value: `$${totalSales.toLocaleString()}`,
			icon: <FaMoneyBillWave />,
			color: "bg-green-100 text-green-600",
		},
		{
			title: "Completed Transactions",
			value: completedTransactions,
			icon: <FaUsers />,
			color: "bg-purple-100 text-purple-600",
		},
		{
			title: "Low Stock Items",
			value: lowStockProducts,
			icon: <FaChartLine />,
			color: "bg-yellow-100 text-yellow-600",
		},
	];

	useEffect(() => {
		const generateAnalysis = async () => {
			if (transactions.length > 0 && products.length > 0) {
				setLoading(true);
				try {
					const prompt = buildPromptAnalysis(suppliers, products, transactions);
					const data = await generate(prompt);
					setAnalysis(marked(data));
				} catch (error) {
					toast.error("Failed to generate analysis");
				} finally {
					setLoading(false);
				}
			}
		};

		generateAnalysis();
	}, []);

	const formatDate = (date) => {
		return new Date(date).toLocaleDateString("en-US");
	};

  if (!clientRendered) {
    return null
  }

	return (
		<div>
			<h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				{stats.map((stat, index) => (
					<motion.div
						key={stat.title}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1 }}
						className={`p-6 rounded-xl shadow-sm ${stat.color}`}
					>
						<div className="flex justify-between items-center">
							<div>
								<p className="text-sm font-medium">{stat.title}</p>
								<p className="text-2xl font-bold mt-1">{stat.value}</p>
							</div>
							<div className="text-3xl p-3 rounded-full bg-white bg-opacity-30">
								{stat.icon}
							</div>
						</div>
					</motion.div>
				))}
			</div>

			{/* Recent Transactions */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4 }}
				className="bg-white rounded-xl shadow-sm p-6"
			>
				<h2 className="text-xl font-semibold text-gray-800 mb-4">
					Recent Transactions
				</h2>
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									ID
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Date
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Items
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Amount
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Status
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{transactions.slice(0, 5).map((transaction) => (
								<tr key={transaction.id}>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
										{transaction.id}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{formatDate(transaction.date)}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{transaction.items.length} items
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										${transaction.subtotal.toFixed(2)}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
												transaction.status === "completed"
													? "bg-green-100 text-green-800"
													: "bg-red-100 text-red-800"
											}`}
										>
											{transaction.status}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</motion.div>

			{/* Analysis Section */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.6 }}
				className="bg-white rounded-xl shadow-sm p-6 mt-6"
			>
				<h2 className="text-xl font-semibold text-gray-800 mb-4">Analysis By Artificial Intelligence</h2>

				{loading ? (
					<div className="flex justify-center items-center py-8">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
					</div>
				) : analysis ? (
					<div className="prose max-w-none">
						<div dangerouslySetInnerHTML={{ __html: analysis }} />
					</div>
				) : (
					<p className="text-gray-500">No analysis available</p>
				)}
			</motion.div>
		</div>
	);
}
