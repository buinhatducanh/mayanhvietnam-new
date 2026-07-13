import type { Metadata } from 'next';
import { ShieldCheck, RefreshCw, Phone, MapPin, Clock, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Chính sách bảo hành & đổi trả',
  description: 'Chính sách bảo hành, đổi trả, hoàn tiền tại Máy Ảnh Việt Nam — áp dụng cho tất cả sản phẩm chính hãng.',
};

export default function PolicyPage() {
  return (
    <main className="bg-background">
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-12">
        <h1 className="text-3xl font-extralight text-foreground md:text-4xl">
          Chính Sách Bảo Hành & Đổi Trả
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Áp dụng cho: Công ty TNHH Dịch vụ tư vấn và Công nghệ Sài Gòn
        </p>

        {/* Warranty */}
        <section className="mt-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">I. Chính sách bảo hành</h2>
          </div>

          <div className="mt-6 space-y-6">
            <div className="rounded-xl border border-border p-5">
              <h3 className="font-medium text-foreground">1. Bảo hành chính hãng (sản phẩm mới 100%)</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• Thời gian bảo hành tùy thuộc vào nhãn hàng công bố</li>
                <li>• Tính từ ngày mayanhvietnam nhận thiết bị → ngày gọi khách lấy</li>
              </ul>
            </div>

            <div className="rounded-xl border border-border p-5">
              <h3 className="font-medium text-foreground">2. Bảo hành sản phẩm mới 100%</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• <strong>Máy ảnh & Ống kính</strong>: Lỗi kỹ thuật <strong>12 tháng</strong></li>
                <li>• <strong>Thiết bị khác</strong>: Theo chế độ của hãng</li>
              </ul>
            </div>

            <div className="rounded-xl border border-border p-5">
              <h3 className="font-medium text-foreground">3. Bảo hành sản phẩm cũ</h3>
              <div className="mt-2 overflow-hidden rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-card/60">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium text-foreground">Sản phẩm</th>
                      <th className="px-4 py-2 text-left font-medium text-foreground">Thời hạn</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-t border-border"><td className="px-4 py-2">Flycam, pin sạc, thiết bị Studio</td><td className="px-4 py-2">Không bảo hành</td></tr>
                    <tr className="border-t border-border bg-card/30"><td className="px-4 py-2">Gimbal</td><td className="px-4 py-2">15 ngày</td></tr>
                    <tr className="border-t border-border"><td className="px-4 py-2">Đèn Flash, đèn Studio</td><td className="px-4 py-2">30 ngày</td></tr>
                    <tr className="border-t border-border bg-card/30"><td className="px-4 py-2">Sản phẩm khác</td><td className="px-4 py-2">Theo thông báo</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-xl border border-border p-5">
              <h3 className="font-medium text-foreground">4. Điều kiện bảo hành</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• Sản phẩm do mayanhvietnam bán, có hóa đơn trùng hệ thống</li>
                <li>• Còn thời hạn bảo hành trên tem/hóa đơn</li>
              </ul>
            </div>

            <div className="rounded-xl border border-border p-5">
              <h3 className="font-medium text-foreground">5. Từ chối bảo hành</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• Không phải hàng mayanhvietnam bán</li>
                <li>• Hết hạn bảo hành</li>
                <li>• Không bảo hành cảm biến (sensor), mốc, trầy xước thấu kính</li>
                <li>• Serial/tem bị rách, tẩy xóa</li>
                <li>• Va đập, nước, thiên tai, sử dụng sai cách</li>
                <li>• Đã tháo mở, sửa chỗ khác</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Exchange */}
        <section className="mt-12">
          <div className="flex items-center gap-2">
            <RefreshCw className="size-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">II. Chính sách đổi hàng</h2>
          </div>

          <div className="mt-6 space-y-6">
            <div className="rounded-xl border border-border p-5">
              <h3 className="font-medium text-foreground">Quy định đổi hàng</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• <strong>Lỗi kỹ thuật (mới)</strong>: Đổi mới <strong>7 ngày</strong></li>
                <li>• <strong>Đổi sang SP khác (mới)</strong>: <strong>3 ngày</strong>, còn nguyên nhãn mác</li>
                <li>• <strong>SP qua sử dụng</strong>: mua không quá <strong>2 ngày</strong></li>
              </ul>
            </div>

            <div className="rounded-xl border border-border p-5">
              <h3 className="font-medium text-foreground">Thời gian đổi trả</h3>
              <div className="mt-2 overflow-hidden rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-card/60">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium text-foreground">Loại</th>
                      <th className="px-4 py-2 text-left font-medium text-foreground">SP mới</th>
                      <th className="px-4 py-2 text-left font-medium text-foreground">SP cũ</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-t border-border"><td className="px-4 py-2">Mua tại cửa hàng</td><td className="px-4 py-2">7 ngày</td><td className="px-4 py-2">2 ngày</td></tr>
                    <tr className="border-t border-border bg-card/30"><td className="px-4 py-2">Đơn hàng online</td><td className="px-4 py-2">Tính từ khi nhận hàng</td><td className="px-4 py-2">—</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-xl border border-border p-5">
              <h3 className="font-medium text-foreground">Hoàn tiền</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• Qua tài khoản ngân hàng trong <strong>7 ngày</strong></li>
                <li>• Đổi SP tương tự hoặc hoàn tiền nếu lỗi NSX</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mt-12">
          <div className="flex items-center gap-2">
            <Phone className="size-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">III. Thông tin liên hệ</h2>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border p-5">
              <h3 className="font-medium text-foreground">Hotline</h3>
              <div className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                <a href="tel:0907215252" className="flex items-center gap-2 hover:text-primary">
                  <Phone className="size-3.5 text-primary" /> 0907.21.52.52 / 02866.54.52.52
                </a>
                <a href="tel:0937148222" className="flex items-center gap-2 hover:text-primary">
                  <Phone className="size-3.5 text-primary" /> 0937.148.222 (Mua hàng / BH)
                </a>
                <a href="mailto:info@mayanhvietnam.com" className="flex items-center gap-2 hover:text-primary">
                  <Mail className="size-3.5 text-primary" /> info@mayanhvietnam.com
                </a>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { region: 'TP.HCM', addr: '09 Nam Quốc Cang, P. Bến Thành', hours: '09:00 – 19:00' },
                { region: 'Cần Thơ', addr: '58 Nguyễn Hiền, KDC 91B, P. Tân An', hours: '08:00 – 20:00' },
                { region: 'An Giang', addr: 'Số 1 Đường số 1, Tây sông Hậu', hours: '08:00 – 17:30' },
                { region: 'Đồng Tháp', addr: '126 Hoàng Sa, KP 4, P. Thới Sơn', hours: '08:00 – 18:00' },
              ].map((s) => (
                <div key={s.region} className="rounded-xl border border-border p-3">
                  <p className="text-sm font-medium text-foreground">{s.region}</p>
                  <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="mt-0.5 size-3 shrink-0 text-primary" /> {s.addr}
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="size-3 text-primary" /> {s.hours}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
