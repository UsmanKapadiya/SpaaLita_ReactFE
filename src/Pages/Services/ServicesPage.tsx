import React from 'react';
import './ServicesPage.css';

const ServicesPage: React.FC = () => {


  return (
    <div className="services-page">
      <div className="container-fluid px-0">

        <div className="wp-block-buttons is-content-justification-center is-layout-flex centerAlign wp-container-core-buttons-is-layout-16018d1d wp-block-buttons-is-layout-flex">
          <div className="wp-block-button"><a className="wp-block-button__link has-text-align-center wp-element-button" href="https://www.fresha.com/book-now/spa-alita-v6pl5cct/services?lid=1090026&amp;pId=1033567">BOOK NOW!</a></div>
        </div>



        <div style={{ height: '100px' }} aria-hidden="true" className="wp-block-spacer"></div>



        <div className="position-relative"><figure className="wp-block-image size-full is-resized"><img decoding="async" src="wp-content/uploads/2021/06/services.jpg" width="100%" alt="Services" className="wp-image-458 img-fluid" srcSet="https://spaalita.ca/wp-content/uploads/2021/06/services.jpg 1349w, https://spaalita.ca/wp-content/uploads/2021/06/services-300x107.jpg 300w, https://spaalita.ca/wp-content/uploads/2021/06/services-1024x364.jpg 1024w, https://spaalita.ca/wp-content/uploads/2021/06/services-768x273.jpg 768w, https://spaalita.ca/wp-content/uploads/2021/06/services-100x36.jpg 100w, https://spaalita.ca/wp-content/uploads/2021/06/services-600x213.jpg 600w" sizes="(max-width: 1349px) 100vw, 1349px" /></figure><div className="our-service">
          <div className="service-text">
            <h1 className="text-uppercase mb-4">our services</h1>
            <h6>Treatments You Can Trust</h6>
          </div>
        </div></div>



        <div className="container" id="services"></div>


        {/* FACIALS */}
        <div className="wp-block-columns background-grey d-flex is-layout-flex wp-container-core-columns-is-layout-9d6595d7 wp-block-columns-is-layout-flex">
          <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
            <figure className="wp-block-image is-resized is-style-default img-className"><img decoding="async" src="https://spaalita.ca/wp-content/uploads/2023/07/Custom-Facial-2.jpg" alt="SPA PACKAGES" className="wp-image-456" style={{ width: '404px', height: '269px' }} /></figure>
          </div>
          <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
            <div><h5 className="text-underline">FACIALS</h5>
              <a className="round-buttton d-inline-block mt-5 mb-2" href="facials/">Learn More</a></div>
          </div>
        </div>


        {/* MASSAGE */}
        <div className="wp-block-columns d-flex background-light is-layout-flex wp-container-core-columns-is-layout-9d6595d7 wp-block-columns-is-layout-flex">
          <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
            <figure className="wp-block-image size-full is-resized img-className is-style-default"><img decoding="async" src="https://spaalita.ca/wp-content/uploads/2023/07/Body-to-body-massage-in-Brigade-Road.jpg" alt="" className="wp-image-11691" style={{ width: '401px', height: '286px' }} /></figure>
          </div>
          <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
            <div className="text-black"><h5 className="text-underline">MASSAGE</h5>
              <a className="round-buttton d-inline-block text-black mt-5 mb-2" href="massages/">Learn More</a></div>
          </div>
        </div>


        {/* ACUPRESSURE */}
        <div className="wp-block-columns d-flex background-grey is-layout-flex wp-container-core-columns-is-layout-9d6595d7 wp-block-columns-is-layout-flex">
          <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
            <figure className="wp-block-image size-full is-resized is-style-default img-className"><img fetchPriority="high" decoding="async" width="1024" height="683" src="https://spaalita.ca/wp-content/uploads/2023/07/FOOT-MASSAGE-1.jpg" alt="" className="wp-image-11713" style={{ width: '400px', height: '267px' }} srcSet="https://spaalita.ca/wp-content/uploads/2023/07/FOOT-MASSAGE-1.jpg 1024w, https://spaalita.ca/wp-content/uploads/2023/07/FOOT-MASSAGE-1-300x200.jpg 300w, https://spaalita.ca/wp-content/uploads/2023/07/FOOT-MASSAGE-1-768x512.jpg 768w, https://spaalita.ca/wp-content/uploads/2023/07/FOOT-MASSAGE-1-100x67.jpg 100w, https://spaalita.ca/wp-content/uploads/2023/07/FOOT-MASSAGE-1-600x400.jpg 600w" sizes="(max-width: 1024px) 100vw, 1024px" /></figure>
          </div>
          <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
            <div><h5 className="text-underline text-white">ACUPRESSURE</h5>
              <a className="round-buttton d-inline-block mt-5 mb-2 text-white" href="acupressure/">Learn More</a></div>
          </div>
        </div>



        <div className="wp-block-columns d-flex background-light is-layout-flex wp-container-core-columns-is-layout-9d6595d7 wp-block-columns-is-layout-flex">
          <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
            <figure className="wp-block-image size-full is-resized is-style-default img-className"><img decoding="async" width="870" height="524" src="https://spaalita.ca/wp-content/uploads/2023/07/c870x524.jpg" alt="" className="wp-image-11746" style={{ width: '400px', height: '241px' }} srcSet="https://spaalita.ca/wp-content/uploads/2023/07/c870x524.jpg 870w, https://spaalita.ca/wp-content/uploads/2023/07/c870x524-300x181.jpg 300w, https://spaalita.ca/wp-content/uploads/2023/07/c870x524-768x463.jpg 768w, https://spaalita.ca/wp-content/uploads/2023/07/c870x524-100x60.jpg 100w, https://spaalita.ca/wp-content/uploads/2023/07/c870x524-600x361.jpg 600w" sizes="(max-width: 870px) 100vw, 870px" /></figure>
          </div>
          <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
            <div><h5 className="text-underline text-black">MANICURE &amp; PEDICURE</h5>
              <a className="round-buttton d-inline-block mt-5 mb-2 text-black" href="manicures-and-pedicures/">Learn More</a></div>
          </div>
        </div>



        <div className="wp-block-columns d-flex background-grey is-layout-flex wp-container-core-columns-is-layout-9d6595d7 wp-block-columns-is-layout-flex">
          <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
            <figure className="wp-block-image size-full is-resized is-style-default img-className"><img decoding="async" width="1000" height="667" src="https://spaalita.ca/wp-content/uploads/2023/07/s17.jpg" alt="" className="wp-image-11753" style={{ width: '402px', height: '268px' }} srcSet="https://spaalita.ca/wp-content/uploads/2023/07/s17.jpg 1000w, https://spaalita.ca/wp-content/uploads/2023/07/s17-300x200.jpg 300w, https://spaalita.ca/wp-content/uploads/2023/07/s17-768x512.jpg 768w, https://spaalita.ca/wp-content/uploads/2023/07/s17-100x67.jpg 100w, https://spaalita.ca/wp-content/uploads/2023/07/s17-600x400.jpg 600w" sizes="(max-width: 1000px) 100vw, 1000px" /></figure>
          </div>
          <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
            <div><h5 className="text-underline">BODY TREATMENTS</h5>
              <a className="round-buttton d-inline-block mt-5 mb-2" href="body-treatments/">Learn More</a></div><h1></h1>
          </div>
        </div>



        <div className="wp-block-columns d-flex background-light is-layout-flex wp-container-core-columns-is-layout-9d6595d7 wp-block-columns-is-layout-flex">
          <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
            <figure className="wp-block-image size-full is-resized is-style-default img-className"><img loading="lazy" decoding="async" width="900" height="650" src="https://spaalita.ca/wp-content/uploads/2023/07/WAXING-1.jpg" alt="" className="wp-image-11731" style={{ width: '402px', height: '291px' }} srcSet="https://spaalita.ca/wp-content/uploads/2023/07/WAXING-1.jpg 900w, https://spaalita.ca/wp-content/uploads/2023/07/WAXING-1-300x217.jpg 300w, https://spaalita.ca/wp-content/uploads/2023/07/WAXING-1-768x555.jpg 768w, https://spaalita.ca/wp-content/uploads/2023/07/WAXING-1-100x72.jpg 100w, https://spaalita.ca/wp-content/uploads/2023/07/WAXING-1-600x433.jpg 600w" sizes="auto, (max-width: 900px) 100vw, 900px" /></figure>
          </div>
          <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
            <div><h5 className="text-underline">WAXING</h5>
              <a className="round-buttton d-inline-block mt-5 mb-2" href="waxing/">Learn More</a></div>
          </div>
        </div>



        <div className="wp-block-columns d-flex background-grey is-layout-flex wp-container-core-columns-is-layout-9d6595d7 wp-block-columns-is-layout-flex">
          <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
            <figure className="wp-block-image size-full is-resized is-style-default img-className"><img loading="lazy" decoding="async" width="1024" height="683" src="https://spaalita.ca/wp-content/uploads/2023/07/Laser-Hair.jpg" alt="" className="wp-image-11743" style={{ width: '400px', height: '267px' }} srcSet="https://spaalita.ca/wp-content/uploads/2023/07/Laser-Hair.jpg 1024w, https://spaalita.ca/wp-content/uploads/2023/07/Laser-Hair-300x200.jpg 300w, https://spaalita.ca/wp-content/uploads/2023/07/Laser-Hair-768x512.jpg 768w, https://spaalita.ca/wp-content/uploads/2023/07/Laser-Hair-100x67.jpg 100w, https://spaalita.ca/wp-content/uploads/2023/07/Laser-Hair-600x400.jpg 600w" sizes="auto, (max-width: 1024px) 100vw, 1024px" /></figure>
          </div>
          <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
            <div><h5 className="text-underline text-white">LASER HAIR REMOVAL</h5>
              <a className="round-buttton d-inline-block mt-5 mb-2 text-white" href="Laser-Hair-Removal/">Learn More</a></div>
          </div>
        </div>



        <div className="wp-block-columns d-flex background-light is-layout-flex wp-container-core-columns-is-layout-9d6595d7 wp-block-columns-is-layout-flex">
          <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
            <figure className="wp-block-image size-large is-resized img-className is-style-default"><img loading="lazy" decoding="async" width="1024" height="683" src="https://spaalita.ca/wp-content/uploads/2023/07/AdobeStock_299311362-scaled-1-1024x683.jpeg" alt="" className="wp-image-11757" style={{ width: '400px', height: '267px' }} srcSet="https://spaalita.ca/wp-content/uploads/2023/07/AdobeStock_299311362-scaled-1-1024x683.jpeg 1024w, https://spaalita.ca/wp-content/uploads/2023/07/AdobeStock_299311362-scaled-1-300x200.jpeg 300w, https://spaalita.ca/wp-content/uploads/2023/07/AdobeStock_299311362-scaled-1-768x512.jpeg 768w, https://spaalita.ca/wp-content/uploads/2023/07/AdobeStock_299311362-scaled-1-1536x1025.jpeg 1536w, https://spaalita.ca/wp-content/uploads/2023/07/AdobeStock_299311362-scaled-1-100x67.jpeg 100w, https://spaalita.ca/wp-content/uploads/2023/07/AdobeStock_299311362-scaled-1-600x400.jpeg 600w, https://spaalita.ca/wp-content/uploads/2023/07/AdobeStock_299311362-scaled-1.jpeg 2000w" sizes="auto, (max-width: 1024px) 100vw, 1024px" /></figure>
          </div>
          <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
            <div><h5 className="text-underline">BROW &amp; LASHES </h5>
              <a className="round-buttton d-inline-block mt-5 mb-2" href="brows-and-lashes/">Learn More</a></div>
          </div>
        </div>



        <div className="wp-block-columns d-flex background-grey is-layout-flex wp-container-core-columns-is-layout-9d6595d7 wp-block-columns-is-layout-flex">
          <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
            <figure className="wp-block-image size-large is-resized is-style-default img-className"><img loading="lazy" decoding="async" width="1024" height="701" src="https://spaalita.ca/wp-content/uploads/2023/07/shutterstock_1116897128-1642710076-1024x701.jpg" alt="" className="wp-image-11755" style={{ width: '400px', height: '273px' }} srcSet="https://spaalita.ca/wp-content/uploads/2023/07/shutterstock_1116897128-1642710076-1024x701.jpg 1024w, https://spaalita.ca/wp-content/uploads/2023/07/shutterstock_1116897128-1642710076-300x205.jpg 300w, https://spaalita.ca/wp-content/uploads/2023/07/shutterstock_1116897128-1642710076-768x525.jpg 768w, https://spaalita.ca/wp-content/uploads/2023/07/shutterstock_1116897128-1642710076-100x68.jpg 100w, https://spaalita.ca/wp-content/uploads/2023/07/shutterstock_1116897128-1642710076-600x411.jpg 600w, https://spaalita.ca/wp-content/uploads/2023/07/shutterstock_1116897128-1642710076.jpg 1200w" sizes="auto, (max-width: 1024px) 100vw, 1024px" /></figure>
          </div>
          <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
            <div><h5 className="text-underline">SPA PACKAGES</h5>
              <a className="round-buttton d-inline-block mt-5 mb-2" href="spa-packages/">Learn More</a></div>
          </div>
        </div>



        <div className="wp-block-buttons centerAlign is-content-justification-center is-layout-flex wp-container-core-buttons-is-layout-16018d1d wp-block-buttons-is-layout-flex">
          <div className="wp-block-button"><a className="wp-block-button__link wp-element-button" href="https://www.fresha.com/book-now/spa-alita-v6pl5cct/services?lid=1090026&amp;pId=1033567"><strong>BOOK NOW!</strong></a></div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;