export function fields() {
  return {
    account_number: [
      {
        code: 'required',
        msg: 'Vui lòng nhập dữ liệu',
      },
      {
        code: 'pattern',
        value: /^\d+$/,
        msg: 'Vui lòng nhập giá trị số',
      },
    ],
    firstname: [
      {
        code: 'required',
        msg: 'Vui lòng nhập dữ liệu',
      },
      {
        code: 'maxLength',
        value: 100,
        msg: 'Nhập tối đa 100 ký tự',
      },
    ],
    lastname: [
      {
        code: 'required',
        msg: 'Vui lòng nhập dữ liệu',
      },
      {
        code: 'maxLength',
        value: 100,
        msg: 'Nhập tối đa 100 ký tự',
      },
    ],
    balance: [
      {
        code: 'required',
        msg: 'Vui lòng nhập dữ liệu',
      },
      {
        code: 'pattern',
        value: /^\d+$/,
        msg: 'Vui lòng nhập giá trị số',
      },
      {
        code: 'min',
        value: 0,
        msg: 'Giá trị tối thiểu là 0',
      },
    ],
    age: [
      {
        code: 'required',
        msg: 'Vui lòng nhập dữ liệu',
      },
      {
        code: 'pattern',
        value: /^\d+$/,
        msg: 'Vui lòng nhập giá trị số',
      },
      {
        code: 'min',
        value: 1,
        msg: 'Giá trị tối thiểu là 1',
      },
      {
        code: 'max',
        value: 200,
        msg: 'Giá trị tối đa là 200',
      },
    ],
    gender: [
      {
        code: 'required',
        msg: 'Vui lòng nhập dữ liệu',
      },
    ],
    address: [
      {
        code: 'required',
        msg: 'Vui lòng nhập dữ liệu',
      },
      {
        code: 'maxLength',
        value: 100,
        msg: 'Nhập tối đa 100 ký tự',
      },
    ],
    employer: [
      {
        code: 'required',
        msg: 'Vui lòng nhập dữ liệu',
      },
      {
        code: 'maxLength',
        value: 100,
        msg: 'Nhập tối đa 100 ký tự',
      },
    ],
    email: [
      {
        code: 'required',
        msg: 'Vui lòng nhập dữ liệu',
      },
      {
        code: 'email',
        msg: 'Nhập đúng định dạng email',
      },
    ],
    city: [
      {
        code: 'required',
        msg: 'Vui lòng nhập dữ liệu',
      },
      {
        code: 'maxLength',
        value: 100,
        msg: 'Nhập tối đa 100 ký tự',
      },
    ],
    state: [
      {
        code: 'required',
        msg: 'Vui lòng nhập dữ liệu',
      },
      {
        code: 'maxLength',
        value: 100,
        msg: 'Nhập tối đa 100 ký tự',
      },
    ],
  };
}
