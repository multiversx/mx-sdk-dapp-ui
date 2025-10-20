import { TransactionStatusEnum } from "components";

export function getIsTransactionFailed(status: `${TransactionStatusEnum}`) {
    return (
        status === TransactionStatusEnum.fail || status === TransactionStatusEnum.invalid
    );
}