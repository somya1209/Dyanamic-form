import React, { useState } from "react";
import Paper from '@mui/material/Paper';
import Questions from "../questions/questions";

function Group() {
  const [form, setForm] = useState([]);

  const prevIsValid = () => {
    if (form.length === 0) {
      return true;
    }

    const someEmpty = form.some(
      (item) => item.GroupName === ""
    );

    if (someEmpty) {
      form.map((item, index) => {
        const allPrev = [...form];

        if (form[index].GroupName === "") {
          allPrev[index].errors.GroupName = "GroupName is required";
        }

      
        setForm(allPrev);
      });
    }

    return !someEmpty;
  };

  const handleAddLink = (e) => {
    e.preventDefault();
    const inputState = {
        GroupName: "",
    

      errors: {
        GroupName: null,
       
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
    <div className="container mt-5 py-5">
    


      <form>
        {form.map((item, index) => (
            <div className="single-group">
               {/* <div> 
                   <p >{item.GroupName}</p>
               </div> */}
                <Paper elevation={10} style={{minHeight:" fit-content;",padding:"2%",margin:"2%"}} >
               
                  <div className="row" key={`item-${index}`}>
            <div className="col">
              <input
                type="text"
                className={
                  item.errors.GroupName
                    ? "form-control  is-invalid"
                    : "form-control"
                }
                name="GroupName"
                placeholder="GroupName"
                value={item.GroupName}
                onChange={(e) => onChange(index, e)}
              />

              {item.errors.GroupName && (
                <div className="invalid-feedback">{item.errors.GroupName}</div>
              )}
            </div>

            

            <button
              className="btn "
              onClick={(e) => handleRemoveField(e, index)}
            >
              X
            </button>
            
          </div>
          <Paper elevation={1} style={{minHeight:" fit-content;",margin:"1%",padding:"1%"}} >
                    <Questions/>
        </Paper>
        </Paper>
            </div>
        
        ))}

        <button className="btn btn-primary mt-2" onClick={handleAddLink}>
          Add group
        </button>
      
      </form>
    </div>
  );
}

export default Group;