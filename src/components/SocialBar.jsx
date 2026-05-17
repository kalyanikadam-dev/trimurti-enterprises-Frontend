import { motion } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt, FaFacebookF } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export function SocialBar() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed right-5 bottom-24 z-50 flex flex-col gap-3"
        >

            {/* WhatsApp */}
            <motion.a
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                href="https://wa.me/919860133235"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-green-500 flex items-center justify-center shadow-lg"
            >
                <FaWhatsapp className="text-white text-lg" />
            </motion.a>

            {/* Call */}
            <motion.a
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                href="tel:+919860133235"
                className="w-11 h-11 rounded-full bg-orange-500 flex items-center justify-center shadow-lg"
            >
                <FaPhoneAlt className="text-white text-sm" />
            </motion.a>

            {/* Mail */}
            <motion.a
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                href="mailto:trimurtienterprisesphaltan@gmail.com"
                className="w-11 h-11 rounded-full bg-red-500 flex items-center justify-center shadow-lg"
            >
                <MdEmail className="text-white text-lg" />
            </motion.a>

            {/* Facebook */}
            <motion.a
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                href="https://facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-[#1877F2] flex items-center justify-center shadow-lg"
            >
                <FaFacebookF className="text-white text-lg" />
            </motion.a>

        </motion.div>
    );
}