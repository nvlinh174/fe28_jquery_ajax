function DanhSachNguoiDung() {
    this.mangNguoiDung = [];

    /** Lấy danh sách người dùng */
    this.layDanhSachNguoiDung = function() {
        return $.ajax({
            url: 'http://5d78df55a8c27100149866c2.mockapi.io/api/NguoiDung',
            type: 'GET'
        });
    };

    /** Thêm người dùng */
    this.themNguoiDung = function(nguoiDung) {
        return $.ajax({
            url: 'http://5d78df55a8c27100149866c2.mockapi.io/api/NguoiDung',
            type: 'POST',
            data: nguoiDung
        });
    };
}

/** Xóa người dùng */
DanhSachNguoiDung.prototype.xoaNguoiDung = function(id) {
    return $.ajax({
        url: `http://5d78df55a8c27100149866c2.mockapi.io/api/NguoiDung/${id}`,
        type: 'DELETE'
    });
};

/** Lấy thông tin người dùng */
DanhSachNguoiDung.prototype.layThongTinNguoiDung = function(id) {
    return $.ajax({
        url: `http://5d78df55a8c27100149866c2.mockapi.io/api/NguoiDung/${id}`,
        type: 'GET'
    });
};

/** Cập nhật người dùng */
DanhSachNguoiDung.prototype.capNhatNguoiDung = function(id, nguoiDung) {
    return $.ajax({
        url: `http://5d78df55a8c27100149866c2.mockapi.io/api/NguoiDung/${id}`,
        type: 'PUT',
        data: nguoiDung
    });
};
