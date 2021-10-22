import React, { useState } from "react";
//Todo: questions disappear when new group is created

function Questions() {
  const [form, setForm] = useState([]);

  const prevIsValid = () => {
    if (form.length === 0) {
      return true;
    }

    const someEmpty = form.some(
      (item) => item.Question === ""
    );

    if (someEmpty) {
      form.map((item, index) => {
        const allPrev = [...form];

        if (form[index].Question === "") {
          allPrev[index].errors.Question = "Question is required";
        }

        setForm(allPrev);
      });
    }

    return !someEmpty;
  };

  const handleAddLink = (e) => {
    e.preventDefault();
    const inputState = {
        Question: "",
     

      errors: {
        Question: null,
      
      },
    };

    if (prevIsValid()) {
      setForm((prev) => [...prev, inputState]);
    }
  };

  const onChange = (index, event) => {
    event.preventDefault();
    event.persist();

    setForm((prev) => {
      return prev.map((item, i) => {
        if (i !== index) {
          return item;
        }

        return {
          ...item,
          [event.target.name]: event.target.value,

          errors: {
            ...item.errors,
            [event.target.name]:
              event.target.value.length > 0
                ? null
                : [event.target.name] + " Is required",
          },
        };
      });
    });
  };

  const handleRemoveField = (e, index) => {
    e.preventDefault();

    setForm((prev) => prev.filter((item) => item !== prev[index]));
  };
  return (
    <div className="container mt-1 py-5">
  
   <div >
      <form>
        {form.map((item, index) => (
          <div className="row mt-3" key={`item-${index}`}>
            <div className="col">
              <input
                type="text"
                className={
                  item.errors.Question
                    ? "form-control  is-invalid"
                    : "form-control"
                }
                name="Question"
                placeholder="Question"
                value={item.Question}
                onChange={(e) => onChange(index, e)}
              />

              {item.errors.Question && (
                <div className="invalid-feedback">{item.errors.Question}</div>
              )}
            </div>


            <button
            
              className="btn btn"
              color="red"
              onClick={(e) => handleRemoveField(e, index)}
            >
              X
            </button>
          </div>
        ))}

        <button className="btn btn-primary mt-2" onClick={handleAddLink}>
          Add question
        </button>
      </form>
      </div>
    </div>
  );
}

export default Questions;