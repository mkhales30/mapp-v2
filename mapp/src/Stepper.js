import { useRef, useEffect, useState } from "react";




export const Stepper = (props) => {
  const [newStep, setNewStep] = useState([]);
  const stepRef = useRef();

  //this function provides the updated status of our steps
const updateStep = (stepNumber, steps) => {
  const newSteps = [...steps];
  let count = 0;

  //until we have not looped throughout the steps array
  while (count < newSteps.length){
    // check for the state of current step
    if(count === stepNumber){ //ie. we are at the first step/index
      newSteps[count] ={  // update the state of object at this index 
        ...newSteps[count], // make a copy of the previous state
        higlighted: true,
        selected: true,
        completed: false,
      };
      count ++;
    }
    
    //check for completed step
    else if(count < stepNumber){
      newSteps[count] ={  // update the state of object at this index 
        ...newSteps[count], // make a copy of the previous state
        higlighted: false,
        selected: true,
        completed: true,
      };
      count ++;
   }
    

    //check for pending step
    else{
        newSteps[count] = {  // update the state of object at this index 
        ...newSteps[count], // make a copy of the previous state
        higlighted: false,
        selected: false,
        completed: false,
      };
      count ++;
      }
    }
  return newSteps;
  };



  
;

  useEffect(() => {
    // create object
    const stepsState = props.steps.map((step,index) =>
      Object.assign(
        {},
      {
        description: step,
        completed: false,
        higlighted: index === 0 ? true : false,
        selected: index === 0 ? true: false,
      }
      )
    );
    stepRef.current = stepsState;
    const current = updateStep(props.currentStep -1, stepRef.current);
    setNewStep(current);
  }, [props.steps, props.currentStep]);

  const displaySteps = newStep.map((step, index) => {
    return (
          <div key = {index}
          className= {
            index !== newStep.length -1 ? "w-full flex items-center" : "flex items-center"}>
           
        <div className= "relative flex flex-col ps-8 items-center text-teal-600">
          <div className= {`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-9 w-9 flex items-center justify-center py-3 ${
            step.selected 
            ? "bg-gray-900 text-white font-bold border border-gray-900" 
            :  ""
            }`}
            >
            {/*Display number */}
            {step.completed ? (
              <span className= "text-white font-bold text-xl">&#10003;</span> //placing a check mark on selected step

            ) :(
              index + 1
              )}
            </div>
          <div className={`absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase ${step.higlighted ? "text-gray-900" : "text-gray-400"}`}>
            {/* Display Description */} 
            {step.description}
            </div>
        </div>
          <div className={`flex-auto border-t-2 transitionn duration-500 ease-in-out ${step.completed ? "border-gray-900" : "border-gray-300"} `}>
            {/* Display Line*/}
          </div>
          </div>  
    );
  });
  
  
 
  return (
    <div className= "mx-4 p-4 flex justify-between items-center">
        {displaySteps}

      </div>
  )
}