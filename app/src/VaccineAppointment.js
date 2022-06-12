import { useNavigate } from "react-router-dom";
import DayTimePicker from "@mooncake-dev/react-day-time-picker";
import { useEffect, useState } from "react";
import Modal from "react-modal";

const VaccineAppointment = () => {
  const navigate = useNavigate();
  const [slot, setSlot] = useState(null);
  const [vaccines, setVaccines] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/vaccine-slot", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const body = await response.json();
      if (body.ok) {
        setSlot(body.scheduled_slot);
        setVaccines(body.vaccines || []);
      }
    };
    fetchData();
  }, [slot]);

  const setVaccineSlot = async (slot) => {
    await fetch("/vaccine-slot", {
      method: "POST",
      body: JSON.stringify({
        scheduled_slot: slot,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setSlot(slot);
    setIsOpen(false);
  };

  const setSlotValidated = async () => {
    await fetch("/vaccine-slot", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setSlot(null);
  };

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="container">
      <div className="row">
        <h1>Vaccine Appointment</h1>
        <p>
          You have recieved {vaccines.length} vaccines on :<br />
          {vaccines.map((vaccine) => (
            <>
              {vaccine}
              <br />
            </>
          ))}
        </p>
        <div>
          {slot
            ? `Your appointment is set for ${slot.toLocaleString()}`
            : "You don't have any appointments. "}
        </div>
        {!slot && (
          <>
            <button className="btn btn-primary" onClick={openModal}>
              Select timeslot
            </button>
            <Modal
              isOpen={modalIsOpen}
              contentLabel="Example Modal"
              style={{
                content: {
                  top: "50%",
                  left: "50%",
                  right: "auto",
                  bottom: "auto",
                  marginRight: "-50%",
                  transform: "translate(-50%, -50%)",
                },
              }}
            >
              <DayTimePicker
                timeSlotSizeMinutes={30}
                isLoading={false}
                onConfirm={setVaccineSlot}
                isDone={false}
              />
            </Modal>
          </>
        )}
        {slot && (
          <button onClick={setSlotValidated} className="btn btn-primary">
            Validate vaccine
          </button>
        )}
      </div>
    </div>
  );
};

export default VaccineAppointment;
