import {FC, useState} from "react";
import {AnyObject} from "../../../typings/typedefs";
import {Button} from "react-bootstrap";
import {storeProductControllers} from "../../../controllers/storeProduct.controllers";
import {JsonModal} from "../../ui/JsonModal/JsonModal";
import {employeeControllers} from "../../../controllers/employee.controllers";
import {invoiceControllers} from "../../../controllers/invoice.controllers";
import {parsePromptQuery} from "../../../helpers/functional";

export const OperationsPage: FC = () => {
  const [visibleData, setVisibleData] = useState<AnyObject | null>(null);

  const handleCloseModal = () => {
    setVisibleData(null);
  };

  const handleGetStoreProductInfo = async () => {
    const result = prompt('Enter UPC');
    const [info] = await storeProductControllers.getInfo(result);

    setVisibleData(info);
  };


  const handleGetStoreProductsByCategoryName = async () => {
    const result = prompt('Enter category name');
    const storeProducts = await storeProductControllers.getManyByCategoryName(result);

    setVisibleData(storeProducts)
  };

  const handleGetStoreProductsSortedByAmount = async () => {
    const sortedByAmount = await storeProductControllers.getAllSortedByAmount();

    setVisibleData(sortedByAmount);
  };

  const handleGetEmployeeContactsByLastName = async () => {
    const result = prompt('Enter employee last name');
    const contacts = await employeeControllers.getContactsByLastName(result);

    setVisibleData(contacts);
  };

  const handleGetAllInvoicesByPeriod = async () => {
    const unparsedResult = prompt('Enter start and end date');

    const [startAt, endAt] = parsePromptQuery(unparsedResult);

    if (startAt && endAt) {
      const invoices = await invoiceControllers.getAllByPeriod({
        startAt,
        endAt,
      });

      setVisibleData(invoices);
    }
  };

  const handleGetAllInvoicesByCashierAndPeriod = async () => {
    const unparsedResult = prompt('Enter cashier last name, start and end date');

    const [cashierLastName, startAt, endAt] = parsePromptQuery(unparsedResult);

    if (startAt && endAt) {
      const invoices = await invoiceControllers.getAllByCashierAndPeriod({
        cashierLastName,
        startAt,
        endAt,
      });

      setVisibleData(invoices);
    }
  };

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
            <div className="d-flex gap-2 mb-3">
              <Button onClick={handleGetEmployeeContactsByLastName}>
                Get employee contact by last name
              </Button>
            </div>

            <h3 className="mb-2">Invoices</h3>
            <div className="d-flex gap-2 mb-3">
              <Button onClick={handleGetAllInvoicesByPeriod}>
                Get all invoices by period
              </Button>
              <Button onClick={handleGetAllInvoicesByCashierAndPeriod}>
                Get all invoices by cashier and period
              </Button>
            </div>
          </div>
        )}
    </div>
  )
};
