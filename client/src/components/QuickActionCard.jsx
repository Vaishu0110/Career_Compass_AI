import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function QuickActionCard({
    icon,
    title,
    description,
    link,
}) {
    return (
        <motion.div whileHover={{
            scale:0.98,
        }}
        >
            <Link to ={link}>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
                    <div className="text-5xl mb-4">
                        {icon}
                    </div>
                    <h2 className="text-2xl font-bold">
                        {title}
                    </h2>
                    <p className="text-gray-500 mt-2">
                        {description}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
}