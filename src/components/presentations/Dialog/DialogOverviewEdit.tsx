'use client';

import EventEditContainer from '@/components/containers/event/EventEditContainer';
import DialogWrapper from '@/components/presentations/Dialog/DialogWrapper';
import { EventData } from '@/domain/event';

type Props = {
  isOpen: boolean;
  closeDialog: () => void;
  handleSubmit: (data: EventData) => Promise<void>;
};
const DialogOverviewEdit = ({ isOpen, closeDialog, handleSubmit }: Props) => {
  return (
    <DialogWrapper isOpen={isOpen} closeDialog={closeDialog}>
      <EventEditContainer handleSubmit={handleSubmit} />
    </DialogWrapper>
  );
};

export default DialogOverviewEdit;
