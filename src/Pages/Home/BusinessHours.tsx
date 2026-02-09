import { BUSINESS_HOURS, CONTENT } from './homeConstants';

const BusinessHours = () => {
  return (
    <div className="my-5" id="business-hours">
      <div className="col-lg-3 col-sm-6 m-auto text-center">
        <h5 className="text-center mt-2 mb-4">{CONTENT.BUSINESS_HOURS.TITLE}</h5>
        <table className="business-hours-table">
          <tbody>
            {BUSINESS_HOURS.map(({ day, hours }) => (
              <tr key={day}>
                <td>{day}</td>
                <td>{hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h6 className="text-center my-4">{CONTENT.BUSINESS_HOURS.NOTE}</h6>
      </div>
    </div>
  );
};

export default BusinessHours;
