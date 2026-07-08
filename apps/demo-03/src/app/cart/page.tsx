import { Link, useNavigate } from "react-router";
import { Minus, Plus, Trash2, ShoppingBag, ChevronRight, Tag, Truck } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

const fmt = (n: number) => n.toLocaleString("vi-VN") + "đ";

export default function Cart() {
  const { items, removeItem, updateQty, total, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-16 flex flex-col items-center gap-4 text-center">
        <ShoppingBag size={64} className="text-gray-200" />
        <h2 className="text-xl font-bold text-gray-800">Giỏ hàng trống</h2>
        <p className="text-sm text-gray-500 max-w-xs">Chưa có sản phẩm nào trong giỏ. Hãy khám phá và thêm sản phẩm bạn yêu thích.</p>
        <Link
          to="/"
          className="mt-2 bg-[#f26522] hover:bg-[#d95a1a] text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
        >
          Tiếp tục mua sắm <ChevronRight size={16} />
        </Link>
      </div>
    );
  }

  const shipping = total >= 1000000 ? 0 : 50000;
  const discount = Math.round(total * 0.05);
  const finalTotal = total - discount + shipping;

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-gray-500 mb-4">
        <Link to="/" className="hover:text-[#f26522]">Trang chủ</Link>
        <ChevronRight size={12} />
        <span className="text-gray-700 font-medium">Giỏ hàng</span>
      </nav>

      <h1 className="text-xl font-bold mb-4">Giỏ hàng ({items.length} sản phẩm)</h1>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Cart items */}
        <div className="flex-1 space-y-3">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-lg border p-4 flex gap-4">
              <Link to="/product/canon-eos-r50" className="shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg bg-gray-100"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to="/product/canon-eos-r50" className="text-sm font-medium text-gray-800 hover:text-[#f26522] line-clamp-2">
                  {item.name}
                </Link>
                {item.variant && (
                  <p className="text-xs text-gray-500 mt-0.5">Phân loại: {item.variant}</p>
                )}
                <p className="text-[#f26522] font-bold text-sm mt-1">{fmt(item.price)}</p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border rounded overflow-hidden">
                    <button
                      className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 text-gray-600"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-9 text-center text-sm font-medium">{item.qty}</span>
                    <button
                      className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 text-gray-600"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center">
            <Link to="/" className="text-sm text-[#f26522] hover:underline flex items-center gap-1">
              <ChevronRight size={14} className="rotate-180" /> Tiếp tục mua sắm
            </Link>
            <button onClick={clearCart} className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1">
              <Trash2 size={13} /> Xóa tất cả
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:w-[340px] shrink-0 space-y-3">
          {/* Coupon */}
          <div className="bg-white rounded-lg border p-4">
            <p className="text-sm font-semibold mb-2 flex items-center gap-1.5"><Tag size={14} className="text-[#f26522]" /> Mã giảm giá</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập mã giảm giá"
                className="flex-1 border rounded px-3 py-1.5 text-sm outline-none focus:border-[#f26522]"
              />
              <button className="bg-[#f26522] text-white text-sm px-3 rounded font-medium hover:bg-[#d95a1a]">
                Áp dụng
              </button>
            </div>
          </div>

          {/* Summary card */}
          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-semibold text-base mb-4">Tóm tắt đơn hàng</h3>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between text-gray-700">
                <span>Tổng tiền hàng</span>
                <span>{fmt(total)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Giảm giá (5%)</span>
                <span>-{fmt(discount)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Phí giao hàng</span>
                <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>{shipping === 0 ? "Miễn phí" : fmt(shipping)}</span>
              </div>
              {shipping === 0 && (
                <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 rounded px-2 py-1">
                  <Truck size={11} /> Miễn phí vận chuyển
                </div>
              )}
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-base">
              <span>Tổng cộng</span>
              <span className="text-[#f26522]">{fmt(finalTotal)}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="mt-4 w-full bg-[#f26522] hover:bg-[#d95a1a] text-white font-semibold py-3 rounded-lg transition-colors"
            >
              THANH TOÁN NGAY
            </button>

            <div className="mt-3 text-center text-xs text-gray-500">
              Bảo mật SSL · Giao hàng toàn quốc
            </div>
          </div>

          {/* Policies */}
          <div className="bg-orange-50 rounded-lg border border-orange-100 p-3 space-y-2 text-xs text-gray-600">
            {[
              "✓ Bảo hành chính hãng 24 tháng",
              "✓ Miễn phí giao hàng đơn từ 1 triệu",
              "✓ Đổi trả dễ dàng trong 30 ngày",
              "✓ Hỗ trợ kỹ thuật miễn phí trọn đời",
            ].map(p => <p key={p}>{p}</p>)}
          </div>
        </div>
      </div>
    </div>
  );
}
