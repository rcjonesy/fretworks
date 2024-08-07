import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";
import { getServices } from "../managers/ServiceManager";
import { useState, useEffect } from "react";
import { postNewRepair } from "../managers/RepairTicketManager";
import { useNavigate } from "react-router-dom";
import { FcEmptyTrash } from "react-icons/fc";

export const NewRepair = ({ loggedInUser }) => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [newRepair, setNewRepair] = useState({
    customerName: "",
    email: "",
    phoneNumber: "",
    instrument: "",
    dropoffDate: "",
    isRushed: false,
    message: "",
    customerId: loggedInUser.id,
    repairTicketServices: [],
  });

  const handleGetServices = () => {
    getServices().then(setServices);
  };

  useEffect(() => {
    handleGetServices();
  }, []);

  const handleName = (event) => {
    setNewRepair({ ...newRepair, customerName: event.target.value });
  };

  const handleEmail = (event) => {
    setNewRepair({ ...newRepair, email: event.target.value });
  };

  const handlePhoneNumber = (event) => {
    setNewRepair({ ...newRepair, phoneNumber: event.target.value });
  };

  const handleInstrument = (event) => {
    setNewRepair({ ...newRepair, instrument: event.target.value });
  };

  const handleDropoffDate = (event) => {
    setNewRepair({ ...newRepair, dropoffDate: event.target.value });
  };

  const handleMessage = (event) => {
    setNewRepair({ ...newRepair, message: event.target.value });
  };

  const handleCheck = () => {
    setNewRepair({ ...newRepair, isRushed: !newRepair.isRushed });
  };

  const handleSelectService = (event) => {
    const selectedServiceId = event.target.value;
    const selctedService = services.find(
      (service) => service.id == selectedServiceId
    );
    // Check if the serviceId already exists in the array
    const existingService = newRepair.repairTicketServices.find(
      (service) => service.serviceId === selectedServiceId
    );
    // If the serviceId doesn't already exist, add it to the array
    if (!existingService) {
      setNewRepair({
        ...newRepair,
        repairTicketServices: [
          ...newRepair.repairTicketServices,
          {
            serviceId: selectedServiceId,
            serviceName: selctedService.serviceName,
          },
        ],
      });
    }
  };

  const handleRemoveService = (serviceId) => {
    // Filter through the array to remove the service with the given serviceId
    const filteredServices = newRepair.repairTicketServices.filter(
      (service) => {
        return service.serviceId !== serviceId;
      }
    );
    // Set the new array without the removed service
    setNewRepair({
      ...newRepair,
      repairTicketServices: filteredServices,
    });
  };

  console.log(newRepair);
  const handleSubmit = (event) => {
    console.log("clicked");
    event.preventDefault();

    postNewRepair(newRepair).then(() => {
      navigate(`/customer/${loggedInUser.id}`);
    });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Form className="w-50">
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            id=""
            placeholder="Enter your name"
            onChange={handleName}
          />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            id=""
            placeholder="Enter your email"
            onChange={handleEmail}
          />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone Number</Label>
          <Input
            type="tel"
            id=""
            placeholder="Enter your phone number"
            onChange={handlePhoneNumber}
          />
        </FormGroup>
        <FormGroup>
          <Label>Instrument</Label>
          <Input
            type="text"
            placeholder="Instrument"
            onChange={handleInstrument}
          />
        </FormGroup>
        <FormGroup>
          <Label>Choose Drop off Date</Label>
          <Input type="date" onChange={handleDropoffDate} />
        </FormGroup>
        <FormGroup>
          <Label>Additional Info</Label>
          <Input
            type="textarea"
            id=""
            placeholder="Send us a message"
            onChange={handleMessage}
          />
        </FormGroup>
        <FormGroup>
          <Label>Select Services</Label>
          <Input type="select" id="" onChange={handleSelectService}>
            <option value="0">Choose a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.serviceName} - ${service.cost}
              </option>
            ))}
          </Input>
          <div className="mt-2 mb-2">
            {newRepair.repairTicketServices.map((service) => (
              <p key={service.serviceId}>
                - {service.serviceName}{" "}
                <FcEmptyTrash
                  size={27}
                  onClick={() => handleRemoveService(service.serviceId)}
                />
              </p>
            ))}
          </div>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              checked={newRepair.isRushed}
              onChange={handleCheck}
            />{" "}
            $75 Rush?
          </Label>
        </FormGroup>
        <Button color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};
