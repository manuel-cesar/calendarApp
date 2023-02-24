import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { localizer } from '../../helpers/calendarLocalizer';
import { NavBar } from '../components/NavBar';
import { getMessagesEs } from '../../helpers/getCalendarMessages';
import { CalendarEvent } from '../components/CalendarEvent';
import { useEffect, useState } from 'react';
import { CalendarModal } from '../components/CalendarModal';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';
import { useAuthStore } from '../../hooks/useAuthStore';

export const CalendarPage = () => {

  const { user } = useAuthStore();

  const { openDateModal } = useUiStore();

  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );
    
    const style = {
      backgroundColor: isMyEvent ? '#34CF7' : '#464646',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    }
    return { style }
  }

  const onDoubleClick = () => {
    openDateModal();
  };

  const onSelect = ( event ) => {
    setActiveEvent( event );
  }

  const onViewChange = ( event ) => {
    localStorage.setItem('lastView', event);
    setLastView( event );
  }

  useEffect(() => {
    startLoadingEvents();
  }, []);
  

  return (
    <>
      <NavBar />

      <Calendar
        culture='es'
        messages={ getMessagesEs() }
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        eventPropGetter={ eventStyleGetter }
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChange }
      />

      <CalendarModal />
      
      <FabAddNew />
      <FabDelete />
    </>
  )
}
