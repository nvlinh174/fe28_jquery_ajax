$(document).ready(function() {
    var danhSachNguoiDung = new DanhSachNguoiDung();

    getUsers();

    $('#btnThemNguoiDung').click(function() {
        $('#myModal .modal-title').html('Thêm người dùng');
        $('#TaiKhoan').removeAttr('readOnly');
        var modalFooter =
            '<button class="btn btn-success" id="btnThem">Thêm</button>';
        $('#myModal .modal-footer').html(modalFooter);

        resetInput();
    });

    /** Chức năng thêm */
    $('body').delegate('#btnThem', 'click', function() {
        var nguoiDung = getInputValue();
        postUser(nguoiDung);
    });

    /** Chức năng xóa */
    $('body').delegate('.btnXoa', 'click', function() {
        var id = $(this).data('id');
        deleteUser(id);
    });

    /** Khi nhấn vào button Sửa */
    $('body').delegate('.btnSua', 'click', function() {
        var id = $(this).data('id');

        $('#myModal .modal-title').html('SỬA THÔNG TIN NGƯỜI DÙNG');
        var modalFooter = `<button class="btn btn-warning" id="btnCapNhat" data-id="${id}">Cập nhật</button>`;
        $('#myModal .modal-footer').html(modalFooter);
        $('#TaiKhoan').attr('readOnly', true);

        getUser(id);
    });

    /** Chức năng cập nhật */
    $('body').delegate('#btnCapNhat', 'click', function() {
        var id = $(this).data('id');
        var nguoiDung = getInputValue();

        putUser(id, nguoiDung);
    });

    /** Implement lấy danh sách tất cả người dùng */
    function getUsers() {
        danhSachNguoiDung
            .layDanhSachNguoiDung()
            .done(function(result) {
                taoBang(result);
            })
            .fail(function(error) {
                console.log(error);
            });
    }

    /** Implement Lấy thông tin người dùng */
    function getUser(id) {
        danhSachNguoiDung
            .layThongTinNguoiDung(id)
            .done(function(result) {
                // console.log(result);
                $('#TaiKhoan').val(result.taiKhoan);
                $('#HoTen').val(result.hoTen);
                $('#MatKhau').val(result.matKhau);
                $('#Email').val(result.email);
                $('#SoDienThoai').val(result.phone);
                $('#loaiNguoiDung').val(result.maLoaiNguoiDung);
            })
            .fail(function(error) {
                console.log(error);
            });
    }

    /** Implement Thêm người dùng */
    function postUser(nguoiDung) {
        danhSachNguoiDung
            .themNguoiDung(nguoiDung)
            .done(function(result) {
                // console.log(result);
                getUsers();
            })
            .fail(function(error) {
                console.log(error);
            });
    }

    /** Implement Xóa người dùng */
    function deleteUser(id) {
        danhSachNguoiDung
            .xoaNguoiDung(id)
            .done(function(result) {
                // console.log(result);
                getUsers();
            })
            .fail(function(error) {
                console.log(error);
            });
    }

    /** Implement Cập nhật người dùng */
    function putUser(id, nguoiDung) {
        danhSachNguoiDung
            .capNhatNguoiDung(id, nguoiDung)
            .done(function(result) {
                // console.log(result);
                getUsers();
            })
            .fail(function(error) {
                console.log(error);
            });
    }

    /** tạo bảng */
    function taoBang(dsnd) {
        var content = '';

        dsnd.map(function(item, index) {
            content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.taiKhoan}</td>
                    <td>${item.matKhau}</td>
                    <td>${item.hoTen}</td>
                    <td>${item.email}</td>
                    <td>${item.phone}</td>
                    <td>${item.maLoaiNguoiDung}</td>
                    <td>
                        <button class="btn btn-info btnSua" data-toggle="modal" data-target="#myModal" data-id="${
                            item.id
                        }">Sửa</button>
                        <button class="btn btn-danger btnXoa" data-id="${
                            item.id
                        }">Xóa</button>
                    </td>
                </tr>
            `;
        });

        $('#tblDanhSachNguoiDung').html(content);
    }

    /** DOM đến các input để lấy giá trị và trả về object NguoiDung */
    function getInputValue() {
        var taiKhoan = $('#TaiKhoan')
            .val()
            .trim();
        var hoTen = $('#HoTen')
            .val()
            .trim();
        var matKhau = $('#MatKhau')
            .val()
            .trim();
        var email = $('#Email')
            .val()
            .trim();
        var phone = Number(
            $('#SoDienThoai')
                .val()
                .trim()
        );
        var maLoaiNguoiDung = $('#loaiNguoiDung')
            .val()
            .trim();

        var nguoiDung = new NguoiDung(
            taiKhoan,
            hoTen,
            matKhau,
            email,
            phone,
            maLoaiNguoiDung
        );

        return nguoiDung;
    }

    /** Reset các input */
    function resetInput() {
        $('#TaiKhoan').val('');
        $('#HoTen').val('');
        $('#MatKhau').val('');
        $('#Email').val('');
        $('#SoDienThoai').val('');
        $('#loaiNguoiDung').val('GV');
    }
});
