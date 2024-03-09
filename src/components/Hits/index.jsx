/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./style.scss";

const Hits = ({ difficulty, hits }) => {
  const [slots, setSlots] = useState([]);

  function calcSlots() {
    const new_slots = Array(difficulty);

    for (let i = 0; i < difficulty; i++) {
      if (hits[i]) {
        new_slots.push({
          hit: true,
          color: hits[i],
        });
      } else {
        new_slots.push({
          hit: false,
          color: "",
        });
      }
    }

    setSlots(() => new_slots);
  }

  useEffect(() => {
    calcSlots();
  }, [hits]);

  return (
    <section className="mix">
      {hits &&
        slots.map((slot, index) => {
          console.log(slots, slot, index);
          return (
            <div
              key={index}
              className={slot.hit ? "filled" : "empty"}
              style={{ backgroundColor: slot.hit ? `#${slot.color}` : "" }}
            ></div>
          );
        })}
    </section>
  );
};

export default Hits;
