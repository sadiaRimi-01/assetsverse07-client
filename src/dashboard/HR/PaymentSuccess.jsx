
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const email = localStorage.getItem("userEmail");

  const packageName = params.get("packageName");
  const employeeLimit = params.get("employeeLimit");
  const amount = params.get("amount");
  const sessionId = params.get("session_id"); 

  useEffect(() => {
    const savePayment = async () => {
      try {
        await axios.post("http://localhost:3000/payments/success", {
          email,
          packageName,
          employeeLimit,
          amount,
          sessionId,
        });
 toast.success("Payment saved successfully!");
        // redirect back to upgrade page
        setTimeout(() => {
          navigate("/dashboard/hr/upgrade");
        }, 1500);
      } catch (err) {
        console.error("Payment save failed", err);
        toast.error("Payment save failed!");
      }
    };

    if (email && packageName && amount) {
      savePayment();
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-green-600">
          Payment Successful 🎉
        </h2>
        <p className="mt-2">Updating your plan...</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
