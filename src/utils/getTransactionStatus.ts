import { TransactionStatusEnum } from 'constants/transactionStatus.enum';

export function getIsTransactionFailed(status: `${TransactionStatusEnum}`) {
    return (
        status === TransactionStatusEnum.fail || status === TransactionStatusEnum.invalid
    );
}