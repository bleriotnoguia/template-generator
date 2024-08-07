// ...

import { Button } from "@/components/ui/button";
import React from "react";
import { useSettingsContext } from "../settings-context";
import { toast } from "react-toastify";

export default function VariableForm() {
  const { variables, setVariables } = useSettingsContext();

  const [formData, setFormData] = React.useState([{ key: "", value: "" }]);

  // Function to handle changes in the key and value inputs
  const handleInputChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const updatedFormData = [...formData];
    updatedFormData[index][field] = value;
    setFormData(updatedFormData);
  };

  // Function to add a new set of key-value inputs
  const addInput = () => {
    setFormData([...formData, { key: "", value: "" }]);
  };

  // Function to remove a set of key-value inputs
  const removeInput = (index: number) => {
    const updatedFormData = [...formData];
    updatedFormData.splice(index, 1);
    setFormData(updatedFormData);
  };

  // Update the variables with the email, name, and additional data
  const updateVariables = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setVariables(formData);
    // also save in local storage
    if (typeof window !== "undefined") {
      window.localStorage.setItem("variables", JSON.stringify(formData));
    }
    toast.success("Variables updated successfully.");
  };

  // initial state
  React.useEffect(() => {
    setFormData(variables);
  }, [variables]);

  return (
    <div>
      {/* ... */}
      <div className="flex flex-col items-center">
        <h3 className="mb-10 text-2xl font-semibold text-center">Variables</h3>
        <div className="flex justify-end mb-5 w-1/3">
          <Button variant="outline" onClick={addInput}>
            Add variable
          </Button>
        </div>
        <form className="flex flex-col space-y-4" onSubmit={updateVariables}>
          {/* Additional data inputs */}
          {formData.map((data, index) => (
            <div key={index} className="flex space-x-2">
              <input
                type="text"
                className="p-2 border rounded-md"
                placeholder="Key"
                value={data.key}
                onChange={(e) =>
                  handleInputChange(index, "key", e.target.value)
                }
              />
              <input
                type="text"
                className="p-2 border rounded-md"
                placeholder="Value"
                value={data.value}
                onChange={(e) =>
                  handleInputChange(index, "value", e.target.value)
                }
              />
              <Button variant="outline" onClick={() => removeInput(index)}>
                Remove
              </Button>
            </div>
          ))}
          <Button className="w-1/2" variant={"outline"} type="submit">
            Update Variables
          </Button>
        </form>
      </div>
    </div>
  );
}
