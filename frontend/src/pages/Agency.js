import React, { useState } from 'react'
import { Button, Collapse, Container, Row } from 'react-bootstrap'
import { FaAngleDown, FaArrowRight } from 'react-icons/fa'
import { MdOutlineLocalShipping } from 'react-icons/md'

const Agency = () => {
  const buttons = [
    { id: 1, label: 'Cửa hàng của chúng tôi bán những sản phẩm điện tử nào', content: 'Chúng tôi cung cấp một loạt các sản phẩm điện tử đa dạng, bao gồm điện thoại thông minh, máy tính bảng, laptop, TV, máy ảnh, loa và nhiều sản phẩm công nghệ khác. Bạn có thể tìm thấy những thiết bị hàng đầu từ các thương hiệu uy tín trên toàn thế giới.' },
    { id: 2, label: 'Làm thế nào để tìm kiếm sản phẩm phù hợp với yêu cầu ?', content: 'Chúng tôi cung cấp công cụ tìm kiếm tiên tiến trên trang web của chúng tôi. Bạn có thể nhập từ khóa, lọc theo danh mục hoặc sử dụng các tiêu chí khác để thu hẹp phạm vi tìm kiếm. Ngoài ra, đội ngũ nhân viên chuyên nghiệp của chúng tôi cũng sẽ sẵn lòng hỗ trợ bạn trong việc tìm kiếm sản phẩm phù hợp.' },
    { id: 3, label: 'Có phương thức thanh toán và vận chuyển của chúng tôi hổ trợ ?', content: 'Chúng tôi hỗ trợ nhiều phương thức thanh toán an toàn và tiện lợi, bao gồm thanh toán qua thẻ tín dụng, chuyển khoản ngân hàng và các hình thức thanh toán trực tuyến phổ biến khác. Đối với vận chuyển, chúng tôi sử dụng các dịch vụ vận chuyển đáng tin cậy để đảm bảo sản phẩm được giao đến bạn một cách nhanh chóng và an toàn.' },
    { id: 4, label: 'Làm thế nào dể liên hệ với dịch vụ hỗ trợ của chúng tôi ?', content: 'Bạn có thể liên hệ với dịch vụ khách hàng của chúng tôi qua số điện thoại, email hoặc qua trang liên hệ trên trang web của chúng tôi. Đội ngũ nhân viên chuyên nghiệp và nhiệt tình sẽ sẵn sàng giải đáp mọi câu hỏi và hỗ trợ bạn trong quá trình mua sắm và sau khi mua hàng.' },
  ];

  const [open, setOpen] = useState([]);

  const toggleCollapse = (id) => {
    setOpen((prevState) => {
      const index = prevState.indexOf(id);
      if (index !== -1) {
        return prevState.filter((item) => item !== id);
      } else {
        return [...prevState, id];
      }
    });
  };
  return (
    <Container>
      <Row className='pt-5 pb-5 bg-secondary '>
        <div className='col-6'>
          <h6>Giới thiệu</h6>
          <h2>Những thiết bị công nghệ hàng đầu</h2>
          <p>Chúng tôi tự hào giới thiệu đến bạn một trang web bán hàng trực tuyến chuyên về các sản phẩm điện tử, nơi bạn có thể tìm thấy những thiết bị công nghệ hàng đầu và đáng tin cậy. Với sứ mệnh mang đến cho khách hàng những trải nghiệm mua sắm tuyệt vời và sự hài lòng tuyệt đối, chúng tôi đã xây dựng một nền tảng mua sắm đáng tin cậy và tiện lợi.</p>
          <p className='btn'>Xem Sản Phẩm <FaArrowRight /></p>
        </div>
        <div className='col-6'>
          <img src='https://electio.ecom.themepreview.xyz/home-one/wp-content/uploads/sites/2/2023/10/about1.png' alt='ảnh' />
        </div>
      </Row>
      <Row className='pt-5 pb-5 bg-light'>
        <div className='col-4 p-5'>
          <div className='d-flex justify-content-center flex-column align-items-center'>
            <MdOutlineLocalShipping className='fs-1' />
            <p className='fs-3'>Nhiệm vụ</p>
          </div>
          <p className='text-center'>Cung cấp những sản phẩm điện tử chất lượng cao và dịch vụ mua sắm tốt nhất để mang đến sự hài lòng và tiện ích cho khách hàng. </p>
        </div>
        <div className='col-4 p-5'>
          <div className='d-flex justify-content-center flex-column align-items-center'>
            <MdOutlineLocalShipping className='fs-1' />
            <p className='fs-3'>Tầm nhìn</p>
          </div>
          <p className='text-center'>Cung cấp những sản phẩm điện tử chất lượng cao và dịch vụ mua sắm tốt nhất để mang đến sự hài lòng và tiện ích cho khách hàng.</p>
        </div>
        <div className='col-4 p-5'>
          <div className='d-flex justify-content-center flex-column align-items-center'>
            <MdOutlineLocalShipping className='fs-1' />
            <p className='fs-3'>Hỗ trợ</p>
          </div>
          <p className='text-center'>Cung cấp những sản phẩm điện tử chất lượng cao và dịch vụ mua sắm tốt nhất để mang đến sự hài lòng và tiện ích cho khách hàng.</p>
        </div>
      </Row>
      <Row className='pt-5 pb-5 bg-secondary'>
        <div className='d-flex flex-column align-items-center mb-5'>
          <p className='fs-6 text-danger'>CÁC CÂU HỎI VÀ TRẢ LỜI</p>
          <p className='fs-1 fw-bold'>Câu Hỏi Thường Gặp</p>
        </div>
        <div className='d-flex'>
          <div className='col-6'>
            {buttons.map((button) => (
              <div key={button.id}>
                <div className={`d-flex mt-3 p-3 ${open.includes(button.id) ? 'activeToggle' : ''}`}>
                  <p className='col-11'>{button.label}</p>
                  <Button
                    onClick={() => toggleCollapse(button.id)}
                    aria-controls={`example-collapse-text${button.id}`}
                    aria-expanded={open.includes(button.id)}
                    className='bg-transparent border-0 text-dark'
                  >
                    <FaAngleDown />
                  </Button>
                </div>
                <Collapse in={open.includes(button.id)}>
                  <div id={`example-collapse-text${button.id}`} className='toggleContent p-3'>
                    {button.content}
                  </div>
                </Collapse>
              </div>
            ))}
          </div>
          <div className='col-6'>
            <div className='d-flex'>
              <img src='https://e-tech.monamedia.net/wp-content/uploads/2023/10/faq2.png' alt='zxczxc' className='p-3 col-6' />
              <img src='https://e-tech.monamedia.net/wp-content/uploads/2023/10/faq2.png' alt='zxczxc' className='p-3 col-6' />
            </div>
          </div>
        </div>
      </Row>
      <Row className='pt-5 pb-5 bg-danger'>
        <div className='d-flex'>
          <div className='col-3 d-flex'>
            <p className='fs-1 text-warning pt-3'><MdOutlineLocalShipping /></p>
            <div className='p-4'>
              <p className='text-light fs-5 mb-0'>Giao hàng miễn phí</p>
              <p className='fs-6 text-light'>Từ đơn hàng trên 1,000,000 đ</p>
            </div>
          </div>
          <div className='col-3 d-flex'>
            <p className='fs-1 text-warning pt-3'><MdOutlineLocalShipping /></p>
            <div className='p-4'>
              <p className='text-light fs-5 mb-0'>Hổ trợ 24/7</p>
              <p className='fs-6 text-light'>Nhận hỗ trợ trực tuyến 24/7</p>
            </div>
          </div>
          <div className='col-3 d-flex'>
            <p className='fs-1 text-warning pt-3'><MdOutlineLocalShipping /></p>
            <div className='p-4'>
              <p className='text-light fs-5 mb-0'>Hoàn tiền</p>
              <p className='fs-6 text-light'>Hoàn trả trong vòng 15 ngày</p>
            </div>
          </div>
          <div className='col-3 d-flex'>
            <p className='fs-1 text-warning pt-3'><MdOutlineLocalShipping /></p>
            <div className='p-4'>
              <p className='text-light fs-5 mb-0'>Mã quà tặng</p>
              <p className='fs-6 text-light'>Nhận mã khuyến mãi</p>
            </div>
          </div>

        </div>
      </Row>
    </Container>
  )
}

export default Agency