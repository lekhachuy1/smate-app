# SMate — Đặt sân thể thao

Bản mẫu giao diện (UI prototype) chạy được của ứng dụng **SMate**, dựng theo bộ thiết kế trong `ngữ cảnh.docx`.
Không có backend: mọi lượt đặt sân, ghép kèo, mã giảm giá và điểm thưởng đều được tính ngay trong trình duyệt
và biến mất khi tải lại trang.

**Xem thử:** https://lekhachuy1.github.io/smate-app/

## Có gì trong bản mẫu

13 màn hình, đi lại được bằng thanh tab dưới cùng và nút quay lại:

| Màn hình | Nội dung |
|---|---|
| Đăng nhập / Đăng ký | Tách vai trò Người chơi và Chủ sân, đăng nhập Google/Apple (mô phỏng), kiểm tra dữ liệu nhập |
| Trang chủ | Banner, 5 môn dạng ghim bản đồ, lọc theo quận, danh sách sân, xem tất cả |
| Tìm sân | Ô tìm kiếm theo tên/địa chỉ/môn, lọc theo môn, thẻ ảnh lớn |
| Chi tiết sân | 3 tab Thông tin · Bảng giá · Đánh giá, tiện ích, sơ đồ sân vẽ theo số sân thật, yêu thích |
| Chọn ngày và giờ | 7 ngày tới, chọn sân con, khung giờ (giờ đã đặt bị khoá), giá theo giờ thường / cao điểm |
| Xác nhận và thanh toán | 3 phương thức, mã giảm giá `SMATE10` và `NEWBIE`, bảng tổng tiền |
| Hoàn tất | Mã đặt sân, mã QR sinh theo mã, cộng điểm thưởng |
| Ghép kèo | Kèo đang mở / Kèo của tôi, lọc theo môn và theo ngày, tham gia kèo |
| Chi tiết kèo | Thông tin kèo, chủ kèo, danh sách người tham gia, tham gia / rời kèo |
| Tạo kèo mới | Chọn môn, sân, ngày giờ, số người, trình độ, chi phí, ghi chú |
| Bản đồ | Bản đồ vẽ bằng SVG, ghim theo môn, chọn ghim để xem sân |
| Cá nhân | Thống kê, lịch sắp tới, lịch sử đặt sân, sân yêu thích, ưu đãi, đăng xuất |

Giao diện tự đổi theo chế độ sáng/tối của máy.

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

## Giới hạn đã biết

- Không có máy chủ, không có cơ sở dữ liệu, không có đăng nhập thật. Mật khẩu nhập vào không đi đâu cả.
- Dữ liệu sân, kèo, đánh giá là dữ liệu mẫu đặt sẵn trong `src/app.js`.
- Ảnh sân được vẽ bằng gradient và icon SVG thay cho ảnh chụp thật.
- Bản đồ là hình SVG tự vẽ, không phải Google Maps.
