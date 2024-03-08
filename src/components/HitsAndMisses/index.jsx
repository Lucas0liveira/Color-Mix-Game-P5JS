/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./style.scss";

const HitsAndMisses = ({ solution, attempt }) => {
  const [answers, setAnswers] = useState(solution);
  const [slots, setSlots] = useState([]);
  const difficulty = 5;
  const tries = Math.ceil(difficulty + difficulty * 0.25);

  useEffect(() => {
    const new_slots = attempt.map((color) => {
      console.log(answers, color, answers.indexOf(color));
      const index = answers.indexOf(color);
      if (index > 0) {
        setAnswers((a) => a.splice(index, 0));
      }
      return {
        hit: index > 0,
        color,
      };
    });
    console.log("new_slots:", new_slots);
    setSlots(() => new_slots);
  }, [attempt, answers]);

  return (
    <section className="mix">
      {slots.map((slot, index) => {
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

export default HitsAndMisses;
