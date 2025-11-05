// utils/loadRazorpay.js
export default function loadRazorpayScript() {
  return new Promise((resolve, reject) => {
    if (document.getElementById("razorpay-js")) return resolve(true);
    const script = document.createElement("script");
    script.id = "razorpay-js";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
    document.body.appendChild(script);
  });
}
