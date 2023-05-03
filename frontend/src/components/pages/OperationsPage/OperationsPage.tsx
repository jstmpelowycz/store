import {FC, useState} from "react";
import {AnyObject} from "../../../typings/typedefs";
import {Button} from "react-bootstrap";
import {storeProductControllers} from "../../../controllers/storeProduct.controllers";
import {JsonModal} from "../../ui/JsonModal/JsonModal";
import {employeeControllers} from "../../../controllers/employee.controllers";

export const OperationsPage: FC = () => {
  const [visibleData, setVisibleData] = useState<AnyObject | null>(null);

  const handleCloseModal = () => {
    setVisibleData(null);
  };

  const handleGetStoreProductInfo = async () => {
    const [info] = await storeProductControllers.getInfo('05ac77c8-4c1');

    setVisibleData(info);
  };


  const handleGetStoreProductsByCategoryName = async () => {
    const storeProducts = await storeProductControllers.getManyByCategoryName('Y');

    setVisibleData(storeProducts)
  };

  const handleGetStoreProductsSortedByAmount = async () => {
    const sortedByAmount = await storeProductControllers.getAllSortedByAmount();

    setVisibleData(sortedByAmount);
  };

  const handleGetEmployeeContactsByLastName = async () => {
    const contacts = await employeeControllers.getContactsByLastName('Doe');

    setVisibleData(contacts);
  }

  return (
    <div className="d-flex justify-content-center">
      {visibleData ? (
          <JsonModal
            isOpen
            data={visibleData}
            onClose={handleCloseModal}
          />)
        : (
          <div className="mt-5 d-flex gap-2 flex-column">
            <h3 className="mb-2">Store products</h3>
            <div className="d-flex gap-2 mb-3">
              <Button onClick={handleGetStoreProductInfo}>
                Get products info
              </Button>
              <Button onClick={handleGetStoreProductsByCategoryName}>
                Get products by category name
              </Button>
              <Button onClick={handleGetStoreProductsSortedByAmount}>
                Get all products sorted by amount
              </Button>
            </div>

            <h3 className="mb-2">Employee</h3>
            <div className="d-flex gap-2">
              <Button onClick={handleGetEmployeeContactsByLastName}>
                Get employee contact by last name
              </Button>
            </div>
          </div>
        )}
    </div>
  )
}
