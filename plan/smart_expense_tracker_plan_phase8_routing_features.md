# Phase 8: Kế Hoạch Hoàn Thiện Các Trang Vệ Tinh (Budgets, Goals, Settings)

## Goal
Mở rộng ứng dụng từ một Single View thành một ứng dụng Đa trang (Multi-page SPA) với điều hướng mượt mà, bao gồm cả UI và cấu trúc dữ liệu Backend cho các trang: Budgets (Ngân sách), Goals (Mục tiêu), và Settings (Cài đặt).

## Scope
1. **Backend Data Layer**
   - Thiết kế Schema cho `budgets` và `goals`.
   - Viết API Endpoints (CRUD) cho Budgets và Goals.

2. **Kiến Trúc Frontend (Routing)**
   - Cài đặt thư viện `react-router-dom`.
   - Tách nội dung Dashboard ra file riêng.
   - Cấu hình Router và cập nhật Sidebar/Bottom Nav.

3. **Xây Dựng Các Trang Mới (Pages UI)**
   - `Budgets.jsx`: Quản lý ngân sách với giao diện Progress Bar.
   - `Goals.jsx`: Quản lý mục tiêu tài chính với Circular Progress.
   - `Settings.jsx`: Tuỳ chỉnh ứng dụng cơ bản.

## Execution Steps
- Update `schema.sql` và thực thi trên MySQL để tạo bảng.
- Tạo files trong `backend/routes/`.
- Cài đặt React Router.
- Viết các pages tương ứng trong thư mục `frontend/src/pages/`.
- Tích hợp gọi API từ Frontend.
