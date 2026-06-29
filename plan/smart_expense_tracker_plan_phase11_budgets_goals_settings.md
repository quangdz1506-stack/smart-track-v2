# Phase 11: Hoàn Thiện Budgets, Goals & Settings Enrichment

Mục tiêu của Phase này là biến 3 trang chức năng (Budgets, Goals, Settings) từ giao diện tĩnh thành các chức năng hoàn chỉnh, tương tác trực tiếp với Database và liên kết chặt chẽ với dữ liệu Transactions.

## 1. Cấp độ Backend (API & Logic)
- **Tự động hoá Budgets:** Sửa API `GET /api/budgets` để thực hiện câu lệnh `JOIN` hoặc truy vấn phụ với bảng `transactions`. Mục tiêu: Tự động cộng dồn các giao dịch chi tiêu (`expense`) thuộc đúng danh mục và tháng đó vào `spent_amount`. Không bắt người dùng nhập tay.
- **API Cập nhật Goal:** Cung cấp API `PUT /api/goals/:id/add-funds` để nạp thêm tiền vào `current_amount`.
- **API Xoá Dữ Liệu (Reset):** Thêm route `DELETE /api/users/reset` để hỗ trợ xoá mọi dữ liệu giao dịch/ngân sách/mục tiêu của User hiện tại.

## 2. Cấp độ Frontend - Budgets
- **CRUD Giao diện:** 
  - Thêm nút "Add Budget". 
  - Xây dựng Modal Form cho phép người dùng chọn danh mục (Category), số tiền giới hạn (`limit_amount`) và tháng áp dụng (Month).
- **Tính năng Xoá/Sửa:** Thêm tuỳ chọn Xoá và Sửa cho các thẻ ngân sách.
- **Hiệu ứng UX:** 
  - Hiển thị Progress Bar dựa trên tỷ lệ `spent_amount / limit_amount`.
  - Nếu `spent_amount` vượt quá `limit_amount`, thanh progress bar sẽ tự động chuyển sang màu đỏ (Danger) cảnh báo.

## 3. Cấp độ Frontend - Goals
- **CRUD Giao diện:** 
  - Thêm nút "Add Goal" mở Modal nhập tên mục tiêu, số tiền cần đạt và deadline.
- **Cập nhật Tiến độ:** 
  - Thêm nút "Add Funds" trên mỗi thẻ Goal.
  - Mở Modal nhỏ cho phép nạp thêm tiền vào `current_amount` của mục tiêu đó.
- **Tính năng Xoá/Sửa:** Thêm nút chức năng Xoá/Sửa trên giao diện.

## 4. Cấp độ Frontend - Settings
- **State Tiền Tệ (Currency):** 
  - Cấu hình Context API hoặc LocalStorage để lưu tuỳ chọn Tiền Tệ (USD/VND/EUR).
  - Viết helper format tiền tệ và áp dụng tự động lên mọi con số trên bảng điều khiển.
- **Xử lý Danger Zone (Reset Data):** 
  - Gắn sự kiện cho nút "Reset Data".
  - Hiển thị hộp thoại cảnh báo xác nhận nguy hiểm (Confirm Dialog).
  - Gọi backend wipe data (`DELETE /api/users/reset`) và làm mới lại trang về 0.

## Kế hoạch Xác thực (Verification Plan)
1. **Automated E2E:** Chạy script E2E Playwright để đảm bảo các phase cũ không hỏng.
2. **Manual UI Test:** 
   - Thêm Budget "Food", tạo Transaction "Food" xem Progress Bar có cập nhật.
   - Bấm nút "Reset Data" ở Settings và xác minh biểu đồ rỗng.
