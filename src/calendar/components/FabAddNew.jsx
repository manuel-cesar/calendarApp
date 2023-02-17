import { addHours } from 'date-fns';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { useUiStore } from '../../hooks/useUiStore';

export const FabAddNew = () => {

  const { openDateModal } =useUiStore();
  const { setActiveEvent }  = useCalendarStore();
  
  const handleClickNew = () => {
    setActiveEvent({
      title: 'Titulo',
      notes: 'Notas',
      start: new Date(),
      end: addHours( new Date(), 3 ),
      user: {
        id: '123',
        name: 'Manuel',
      }
    });

    openDateModal();
  }
  return (
    <button
    className='btn btn-primary fab'
    onClick={ handleClickNew }
    >
        <i className='fas fa-plus' />
    </button>
  )
}
