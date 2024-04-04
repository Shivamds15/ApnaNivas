import React, { useEffect } from "react";
import "../../CSS/Accomodation.css";
import ProgressSteps from "../ProgressSteps";

import AccomodationForm from "./AccomodationForm";
import MyAccomodation from "./MyAccomodation";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { accomodationActions } from "../../Store/Accomodation/Accomodation-slice";
import { getAllAccomodation } from "../../Store/Accomodation/Accomodation-action";
import LoadingSpinner from "../LoadingSpinner";

const Accomodation = () => {
  const dispatch = useDispatch();
  const { accomodation, loading } = useSelector((state) => state.accomodation);
  console.log(accomodation);

  useEffect(() => {
    dispatch(getAllAccomodation());
  }, [dispatch]);

  return (
    <>
      <ProgressSteps accomodation />
      <div className="accom-container">
        <Link to="/accomodationform">
          <button className="add-new-place">+ Add new place</button>
        </Link>
        {loading && <LoadingSpinner />}
        {accomodation.length === 0 && !loading && (
          <p>No Accomodation Added. Create One!</p>
        )}
        {accomodation.length > 0 && !loading && (
          <MyAccomodation accomodation={accomodation} loading={loading} />
        )}
      </div>
    </>
  );
};

export default Accomodation;
