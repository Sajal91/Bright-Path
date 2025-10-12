import { useEffect, useState } from "react";

const FlashMessage = ({ status, message, duration = 3000 }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration]);

    if (!visible || !message) return null;

    return (
        <div className={`fixed top-20 left-4 z-50 px-4 py-3 rounded-lg shadow-md text-white flex items-center gap-2 transition-all duration-500 ${status ? "bg-green-600" : "bg-red-600"}`}>
            <span className="font-medium">{message}</span>
        </div >
    );
};

export default FlashMessage;