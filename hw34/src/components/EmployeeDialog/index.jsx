import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

const EmployeeDialog = ({
  isOpenDialog,
  setIsOpenDialog,
  curEmployee,
  employees,
  action,
  setEmployees,
}) => {
  // let tempEmployee = { ...curEmployee };
  // let tempEmployees = [];

  // setTempEmployee(curEmployee);
  // setTempEmployees([]);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
  });

  useEffect(() => {
    if (curEmployee && Object.keys(curEmployee).length > 0) {
      setFormData({
        name: curEmployee.name || "",
        age: curEmployee.age || "",
        address: curEmployee.address || "",
      });
    } else {
      setFormData({
        name: "",
        age: "",
        address: "",
      });
    }
  }, [curEmployee, isOpenDialog]);

  // validate input user

  function validateUser({ name, age, address }) {
    const errors = [];

    // Validate name
    if (typeof name !== "string") {
      errors.push("Name must be a string.");
    } else {
      const trimmedName = name.trim();
      if (!trimmedName) {
        errors.push("Name is required and cannot be empty or whitespace only.");
      } else if (trimmedName.length < 2) {
        errors.push("Name must be at least 2 characters long.");
      } else if (trimmedName.length > 50) {
        errors.push("Name cannot exceed 50 characters.");
      } else if (!/^[\p{L}\s'-]+$/u.test(trimmedName)) {
        errors.push(
          "Name can only contain letters, spaces, hyphens, and apostrophes."
        );
      }
    }

    // Validate age
    if (typeof age !== "number") {
      errors.push("Age must be a number.");
    } else if (!Number.isInteger(age)) {
      errors.push("Age must be a whole number.");
    } else if (age < 1) {
      errors.push("Age must be at least 1.");
    } else if (age > 150) {
      errors.push("Age cannot exceed 150.");
    }

    // Validate address
    if (typeof address !== "string") {
      errors.push("Address must be a string.");
    } else {
      const trimmedAddress = address.trim();
      if (!trimmedAddress) {
        errors.push(
          "Address is required and cannot be empty or whitespace only."
        );
      } else if (trimmedAddress.length < 5) {
        errors.push("Address must be at least 5 characters long.");
      } else if (trimmedAddress.length > 200) {
        errors.push("Address cannot exceed 200 characters.");
      } else if (!/^[\p{L}\p{N}\s,.'#/-]+$/u.test(trimmedAddress)) {
        errors.push("Address contains invalid characters.");
      }
    }

    return errors.length > 0 ? errors.join(" ") : null;
  }

  const handleSubmit = () => {
    const dataToValidate = { ...formData };
    const validation = validateUser(dataToValidate);
    if (!validation) {
      switch (action) {
        case "edit": {
          const updatedEmployees = [...employees].map((emp) =>
            emp.id === curEmployee.id ? { ...emp, ...dataToValidate } : emp
          );
          setEmployees(updatedEmployees);
          toast.success("Edited " + dataToValidate.name);
          setFormData({
            name: "",
            age: "",
            address: "",
          });
          break;
        }

        case "delete": {
          const updatedEmployees = [...employees].filter(
            (emp) => emp.id !== curEmployee.id
          );
          setEmployees(updatedEmployees);
          toast.warn("Deleted " + dataToValidate.name);
          setFormData({
            name: "",
            age: "",
            address: "",
          });
          break;
        }
        case "add": {
          const updatedEmployee = {
            ...dataToValidate,
            id: uuidv4(),
          };
          setEmployees([...employees, updatedEmployee]);
          break;
        }
        default:
          break;
      }

      setIsOpenDialog(false);
    } else {
      toast.error(validation);
    }
  };

  const handleDelete = () => {
    console.log("delete");
  };

  const handleClose = () => {
    console.log("close");
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <Dialog open={isOpenDialog} onClose={() => setIsOpenDialog(false)}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>
            {action == "edit"
              ? "Edit "
              : action == "delete"
              ? "Delete "
              : "Add New "}
            Employee
          </span>
          <CloseOutlinedIcon
            onClick={() => {
              setIsOpenDialog(false);
            }}
          />
        </DialogTitle>
        <DialogContent>
          <TextField
            disabled={action == "delete"}
            fullWidth
            label="Name"
            variant="standard"
            defaultValue={curEmployee.name}
            onChange={(e) => {
              handleInputChange("name", e.target.value);
            }}
          />
          <TextField
            disabled={action == "delete"}
            fullWidth
            label="Age"
            variant="standard"
            defaultValue={curEmployee.age}
            onChange={(e) => {
              handleInputChange("age", Number(e.target.value));
            }}
          />
          <TextField
            disabled={action == "delete"}
            fullWidth
            label="Address"
            variant="standard"
            defaultValue={curEmployee.address}
            onChange={(e) => {
              handleInputChange("address", e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button color={"error"} variant={"outlined"} onClick={handleClose}>
            Cancel
          </Button>
          <Button color={"info"} variant={"outlined"} onClick={handleSubmit}>
            {action == "edit"
              ? "Update"
              : action == "delete"
              ? "Delete"
              : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default EmployeeDialog;
