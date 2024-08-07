import { useParams } from "react-router-dom";
import {
  getRepairByIdForEdit,
  editRepair,
} from "../managers/RepairTicketManager";
import { getServices } from "../managers/ServiceManager";
import { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { FcEmptyTrash } from "react-icons/fc";

export const EditRepair = ({ loggedInUser }) => {
  const navigate = useNavigate();
  const { repairId } = useParams();
  const [repair, setRepair] = useState({
    customerName: "",
    email: "",
    phoneNumber: "",
    instrument: "",
    dropOffDate: "",
    isRushed: false,
    message: "",
    customerId: loggedInUser.id,
    repairTicketServices: [],
  });

  const [services, setServices] = useState([]);

  const handleGetRepairForEdit = () => {
    getRepairByIdForEdit(repairId).then(setRepair);
  };

  const handleGetServices = () => {
    getServices().then(setServices);
  };

  useEffect(() => {
    handleGetRepairForEdit();
    handleGetServices();
  }, []);

  const handleName = (event) => {
    setRepair({ ...repair, customerName: event.target.value });
  };

  const handleEmail = (event) => {
    setRepair({ ...repair, email: event.target.value });
  };

  const handlePhoneNumber = (event) => {
    setRepair({ ...repair, phoneNumber: event.target.value });
  };

  const handleInstrument = (event) => {
    setRepair({ ...repair, instrument: event.target.value });
  };

  const handleDate = (event) => {
    setRepair({ ...repair, dropOffDate: event.target.value });
  };
  const handleSelectService = (event) => {
    const selectedServiceId = event.target.value;

    const selctedService = services.find(
      (service) => service.id == selectedServiceId
    );

    console.log(selctedService);
    // Check if the serviceId already exists in the array
    const existingService = repair.repairTicketServices.find(
      (service) => service.serviceId === selectedServiceId
    );
    // If the serviceId doesn't already exist, add it to the array
    if (!existingService) {
      setRepair({
        ...repair,
        repairTicketServices: [
          ...repair.repairTicketServices,
          {
            serviceId: selectedServiceId,
            serviceName: selctedService.serviceName,
          },
        ],
      });
    }
  };

  const findServiceName = (id) => {
    const foundService = services.find((service) => service.id == id);
    return foundService.serviceName;
  };

  const handleRemoveService = (serviceId) => {
    // Filter through the array to remove the service with the given serviceId
    const filteredServices = repair.repairTicketServices.filter((service) => {
      return service.serviceId !== serviceId;
    });
    // Set the new array without the removed service
    setRepair({
      ...repair,
      repairTicketServices: filteredServices,
    });
  };

  const handleCheck = () => {
    setRepair({ ...repair, isRushed: !repair.isRushed });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    editRepair(repair.id, repair).then(() =>
      navigate(`/customer/${loggedInUser.id}`)
    );
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Form className="w-50">
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            value={repair.customerName}
            onChange={handleName}
          />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input type="text" value={repair.email} onChange={handleEmail} />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone Number</Label>
          <Input
            type="text"
            value={repair.phoneNumber}
            onChange={handlePhoneNumber}
          />
        </FormGroup>
        <FormGroup>
          <Label>Instrument</Label>
          <Input
            type="text"
            value={repair.instrument}
            onChange={handleInstrument}
          />
        </FormGroup>
        <FormGroup>
          <Label>Choose Drop off Date</Label>
          <Input
            type="date"
            value={repair?.dropOffDate?.split("T")[0]}
            onChange={handleDate}
          />
        </FormGroup>
        <FormGroup>
          <Label>Additional Info</Label>
          <Input type="textarea" id="" placeholder="Send us a message" />
        </FormGroup>
        <FormGroup>
          <Label>Select Services</Label>
          <Input type="select" onChange={handleSelectService}>
            <option value="0">Choose a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.serviceName} - ${service.cost}
              </option>
            ))}
          </Input>
          <div className="mt-2 mb-2">
            {repair?.repairTicketServices?.map((service) => (
              <p key={service.serviceId}>
                - {findServiceName(service.serviceId)}
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
              checked={repair.isRushed}
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
