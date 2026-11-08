# SMate — Đặt sân thể thao

Bản mẫu giao diện (UI prototype) chạy được của ứng dụng **SMate**, dựng theo bộ thiết kế trong `ngữ cảnh.docx`.
Không có backend: mọi lượt đặt sân, ghép kèo, mã giảm giá và điểm thưởng đều được tính ngay trong trình duyệt
và biến mất khi tải lại trang.

**Xem thử:** https://lekhachuy1.github.io/smate-app/

## Có gì trong bản mẫu

17 màn hình, đi lại được bằng thanh tab dưới cùng và nút quay lại:

| Màn hình | Nội dung |
|---|---|
| Đăng nhập / Đăng ký | Tách vai trò Người chơi và Chủ sân, đăng nhập Google/Apple (mô phỏng), kiểm tra dữ liệu nhập |
| Trang chủ | Banner thật, logo lớn đè lên banner, 5 môn dạng ghim, lọc theo quận, danh sách sân kèm logo từng sân |
| Tìm sân | Ô tìm kiếm theo tên/địa chỉ/môn, lọc theo môn, thẻ ảnh thật của từng sân |
| Chi tiết sân | 3 tab Thông tin · Bảng giá · Đánh giá, tiện ích, sơ đồ sân vẽ theo số sân thật, yêu thích |
| **Trạng thái sân** | Lưới lịch theo giờ × sân, tông xanh dương, ô trống / đã đặt / bảo trì / lịch của bạn; chọn ô trống để giữ chỗ rồi chuyển thẳng sang thanh toán |
| Chọn ngày và giờ | 7 ngày tới, chọn sân con, khung giờ (giờ đã đặt bị khoá), giá theo giờ thường / cao điểm |
| Xác nhận và thanh toán | 3 phương thức, mã giảm giá `SMATE10` và `NEWBIE`, bảng tổng tiền |
| Hoàn tất | Mã đặt sân, mã QR sinh theo mã, cộng điểm thưởng, nút mở thẳng **Trạng thái sân** |
| Ghép kèo | Kèo đang mở / Kèo của tôi, lọc theo môn và theo ngày, tham gia kèo |
| Chi tiết kèo | Thông tin kèo, chủ kèo, danh sách người tham gia, tham gia / rời kèo |
| Tạo kèo mới | Chọn môn, sân, ngày giờ, số người, trình độ, chi phí, ghi chú |
| Bản đồ | **Google Maps nhúng thật**, chọn sân bằng chip, nút Chỉ đường mở Google Maps |
| **Thông báo** | Danh sách thông báo, đếm số chưa đọc trên chuông, bật thông báo đẩy của trình duyệt |
| Cá nhân | Thống kê, lịch sắp tới, lịch sử đặt sân, sân yêu thích, ưu đãi, đăng xuất |
| **Sửa hồ sơ** | Họ tên, điện thoại, email, giới thiệu, chọn môn và trình độ từng môn |
| **Quản lý sân** (chủ sân) | Hiện khi đăng nhập vai trò *Chủ sân*. 4 mục: Lịch đặt trong ngày · Bật tắt từng sân · Doanh thu 7 ngày có biểu đồ · Dịch vụ đi kèm |

Giao diện tự đổi theo chế độ sáng/tối của máy.

## Kích thước và hiển thị trên điện thoại

- Trên màn hình rộng (laptop): khung máy đứng giữa trang, vùng hiển thị của ứng dụng đúng **390 × 714 px**, cố định.
- Trên màn hình hẹp hơn 520 px (gồm cả 390 px và 360 px): khung bỏ viền máy, **tràn đúng bằng chiều rộng màn hình**, cao bằng `100svh`, không có lề hai bên và không trượt ngang.
- Nội dung dài hơn khung thì cuộn bên trong vùng `.view`; thanh tiêu đề, thanh tab và nút hành động luôn đứng yên, khung không đổi kích thước.

Đăng nhập chọn **Chủ sân** thì tab *Ghép kèo* được thay bằng tab *Quản lý*.

## Luồng nên thử

1. Đăng nhập → Trang chủ → chọn môn **Cầu lông** → bấm **ĐẶT** ở Sân Arena.01
2. Chọn giờ đặt sân → chọn 2 khung giờ **liền nhau** (ô gạch ngang là giờ đã có người đặt)
3. Tiếp tục → nhập mã **SMATE10** → Thanh toán → xem mã đặt sân
4. Tab **Ghép kèo** → Tham gia một kèo → tab **Cá nhân** xem thống kê đổi theo

## Chạy tại máy

```bash
python -m http.server 8000
# mở http://localhost:8000
```

Hoặc mở thẳng `index.html` bằng trình duyệt.

## Cấu trúc

```
src/app.html     giao diện + CSS (nguồn)
src/app.js       toàn bộ logic (nguồn)
assets/logo.png  logo SMate
build.py         ghép src/ thành index.html
index.html       bản build, chính là trang GitHub Pages phục vụ
dist/app.html    bản body-only để publish dạng artifact
```

Sửa trong `src/`, rồi chạy:

```bash
python build.py
```

## Sửa giá sân

Giá nằm một chỗ duy nhất: mảng `VENUES` trong `src/app.js`. Mỗi sân có `lo` (giờ thường) và `hi` (giờ cao điểm),
đơn vị là đồng. Khung giờ nào tính giá cao điểm thì sửa hàm `priceAt`. Sửa xong chạy `python build.py` rồi commit.

## Giới hạn đã biết

- Không có máy chủ, không có cơ sở dữ liệu, không có đăng nhập thật. Mật khẩu nhập vào không đi đâu cả.
- Dữ liệu sân, kèo, đánh giá, doanh thu là dữ liệu mẫu đặt sẵn trong `src/app.js`.
- Bản đồ Google nhúng bằng `<iframe>` nên chỉ hiện khi mở trang qua HTTP(S) — mở thẳng `index.html` từ ổ đĩa có thể bị trống.
- Thông báo đẩy của trình duyệt cần bạn cấp quyền và chỉ chạy trên HTTPS.
