import styled from 'styled-components';
import notificationIcon from '../../image/flowDesigner/notifications.png';
import documentIcon from '../../image/flowDesigner/notes.png';
import descriptionIcon from '../../image/flowDesigner/description.png';

const TopActionBar = styled.div`
  .action-list{
    

    li{
        text-align: center;
        font-size: 12px;

        i{
          background-size: 16px;
          width: 16px;
          height: 16px;
          display: block;
          margin-left: 35%;
        }
        i.notificationBg{
          background-image: url(${notificationIcon}); 
        }
        i.documentBg{
          background-image: url(${documentIcon});
        }
        i.descriptionBg{
          background-image: url(${descriptionIcon});
        }
    }
  }
`;

export { TopActionBar };
