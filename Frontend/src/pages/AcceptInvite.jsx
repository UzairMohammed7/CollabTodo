import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";

const API_URL = import.meta.env.VITE_BASE_URL;

const AcceptInvite = () => {
  const { token } = useParams();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const acceptInvite = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/tasks/get-task-by-token/${token}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const taskId = res.data.taskId;

        await axios.post(`${API_URL}/api/tasks/accept-invite/${taskId}`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        navigate("/"); 
      } catch {
        toast.error("Invalid or expired invite link.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      acceptInvite();
    } else {
      toast.info("Login first to accept the invite.");
      navigate("/login");
    }
  }, [token, isAuthenticated]);

  if (loading) return <p className="text-center mt-10">Processing invite...</p>;

  return null;
};

export default AcceptInvite;
