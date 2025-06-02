"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserService } from "@/services/user.service";
import { paymentService } from "@/services/payment.service";

// Định nghĩa type cho order để tránh dùng any
type Order = {
  orderCode: string;
  isPaid: boolean;
  totalAmount: number;
  paidAt?: string;
};

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [user, setUser] = useState({
    name: "Trống",
    email: "Trống",
    phone: "Trống",
    address: "Trống",
  });

  // State cho tra cứu đơn hàng
  const [trackOrderCode, setTrackOrderCode] = useState("");
  const [trackOrderResult, setTrackOrderResult] = useState<Order | null>(null);
  const [trackOrderError, setTrackOrderError] = useState<string | null>(null);
  const [trackOrderLoading, setTrackOrderLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await UserService.getMe();
        setUser(res.data);
        setLoading(false);
      } catch {
        window.location.href = "/auth/login";
      }
    };
    const getOrders = async () => {
      const res = await paymentService.getOrderByUserId();
      setOrders(res);
    };
    checkAuth();
    getOrders();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      await UserService.updateProfile(user);
      alert("Cập nhật thông tin thành công!");
      setIsEditing(false);
    } catch (error: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as any;
      alert(err?.response?.data?.message || "Cập nhật thông tin thất bại!");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Mật khẩu mới không khớp!");
      return;
    }
    try {
      await UserService.changePassword({
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword
      });
      alert("Đổi mật khẩu thành công!");
      setPasswords({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (error: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as any;
      alert(err?.response?.data?.message || "Đổi mật khẩu thất bại!");
    }
  };

  // Hàm tra cứu đơn hàng
  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setTrackOrderResult(null);
    setTrackOrderError(null);
    console.log(trackOrderCode);
    if (!trackOrderCode.trim()) {
      setTrackOrderError("Vui lòng nhập mã đơn hàng.");
      return;
    }
    setTrackOrderLoading(true);
    try {
      // Gọi API tra cứu đơn hàng theo mã
      // Giả sử paymentService.getOrderByOrderCode(orderCode) trả về 1 đơn hàng hoặc throw nếu không có
      const res = await paymentService.getOrderById(trackOrderCode.trim());
      setTrackOrderResult(res);
      setTrackOrderError(null);
    } catch (error: unknown) {
      setTrackOrderResult(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as any;
      setTrackOrderError(
        err?.response?.data?.message ||
        "Không tìm thấy đơn hàng với mã này."
      );
    } finally {
      setTrackOrderLoading(false);
    }
  };

  const tabs = [
    { key: "profile", label: "Thông tin cá nhân" },
    { key: "changePassword", label: "Đổi mật khẩu" },
    { key: "orderHistory", label: "Lịch sử đơn hàng" },
    { key: "trackOrder", label: "Tra cứu đơn hàng" },
  ];

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4 mt-30">
        <div className="flex animate-pulse space-x-4">
          <div className="size-10 rounded-full bg-gray-200"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 rounded bg-gray-200"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                <div className="col-span-1 h-2 rounded bg-gray-200"></div>
              </div>
              <div className="h-2 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 border-r p-4 space-y-2 pt-20">
        <h1 className="text-xl font-bold mb-4">Quản lý tài khoản</h1>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              setIsEditing(false);
            }}
            className={`block w-full text-left px-4 py-2 rounded  ${activeTab === tab.key ? "border font-bold" : ""
              }`}
          >
            {tab.label}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 pt-20">
        {activeTab === "profile" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="profile" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Thông tin cá nhân</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 border rounded shadow hover:shadow-lg transition-shadow"
                >
                  Chỉnh sửa
                </button>
              ) : (
                <button
                  onClick={handleSaveProfile}
                  className="px-4 py-2 border rounded shadow hover:shadow-lg transition-shadow"
                >
                  Lưu
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Họ tên</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                  />
                ) : (
                  <p className="border rounded px-3 py-2">{user.name || "Trống"}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                  />
                ) : (
                  <p className="border rounded px-3 py-2">{user.email || "Trống"}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={user.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                  />
                ) : (
                  <p className="border rounded px-3 py-2">{user.phone || "Trống"}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Địa chỉ</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={user.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                  />
                ) : (
                  <p className="border rounded px-3 py-2">{user.address || "Trống"}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "changePassword" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="changePassword" className="space-y-6 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Đổi mật khẩu</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  value={passwords.oldPassword}
                  onChange={(e) => handlePasswordChange("oldPassword", e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mật khẩu mới</label>
                <input
                  type="password"
                  value={passwords.newPassword}
                  onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  value={passwords.confirmPassword}
                  onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                />
              </div>
              <button type="submit" className="px-4 py-2 border rounded shadow hover:shadow-lg transition-shadow">
                Cập nhật mật khẩu
              </button>
            </form>
          </motion.div>
        )}

        {activeTab === "orderHistory" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="orderHistory" className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Lịch sử đơn hàng</h2>
            <div className="overflow-x-auto">
              <table className="w-full border rounded shadow text-left">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Mã đơn</th>
                    <th className="border px-4 py-2">Trạng thái thanh toán</th>
                    <th className="border px-4 py-2">Tổng tiền</th>
                    <th className="border px-4 py-2">Ngày thanh toán</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <motion.tr
                      key={order.orderCode}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * index }}
                    >
                      <td className="border px-4 py-2">{order.orderCode}</td>
                      <td className="border px-4 py-2">
                        {order.isPaid ? (
                          <span className="text-green-600 font-semibold">Đã thanh toán</span>
                        ) : (
                          <span className="text-red-500 font-semibold">Chưa thanh toán</span>
                        )}
                      </td>
                      <td className="border px-4 py-2">{order.totalAmount.toLocaleString()}₫</td>
                      <td className="border px-4 py-2">
                        {order.paidAt ? new Date(order.paidAt).toLocaleString("vi-VN") : "N/A"}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
        {activeTab === "trackOrder" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="trackOrder" className="space-y-6 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Tra cứu đơn hàng</h2>
            <form className="space-y-4" onSubmit={handleTrackOrder}>
              <div>
                <label className="block text-sm font-medium mb-1">Nhập mã đơn hàng</label>
                <input
                  type="text"
                  placeholder="ORD12345"
                  value={trackOrderCode}
                  onChange={e => setTrackOrderCode(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                  disabled={trackOrderLoading}
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 border rounded shadow hover:shadow-lg transition-shadow"
                disabled={trackOrderLoading}
              >
                {trackOrderLoading ? "Đang tra cứu..." : "Tra cứu"}
              </button>
            </form>
            {trackOrderError && (
              <p className="text-red-500 text-sm">{trackOrderError}</p>
            )}
            {trackOrderResult && (
              <div className="mt-4 border rounded p-4 bg-gray-50">
                <h3 className="font-semibold mb-2">Kết quả tra cứu:</h3>
                <table className="w-full text-left">
                  <tbody>
                    <tr>
                      <td className="py-1 pr-2 font-medium">Mã đơn:</td>
                      <td>{trackOrderResult.orderCode}</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-2 font-medium">Trạng thái thanh toán:</td>
                      <td>
                        {trackOrderResult.isPaid ? (
                          <span className="text-green-600 font-semibold">Đã thanh toán</span>
                        ) : (
                          <span className="text-red-500 font-semibold">Chưa thanh toán</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-2 font-medium">Tổng tiền:</td>
                      <td>{trackOrderResult.totalAmount.toLocaleString()}₫</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-2 font-medium">Ngày thanh toán:</td>
                      <td>
                        {trackOrderResult.paidAt
                          ? new Date(trackOrderResult.paidAt).toLocaleString("vi-VN")
                          : "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
}
