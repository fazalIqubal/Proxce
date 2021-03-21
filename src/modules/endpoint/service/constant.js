import icon from '../../../image/clock-icon.ico';
import kronos from "../../../image/kronos-icon.png";
import securits from "../../../image/securits-icon.png";
export const dataSource = [
  {
    key: '1',
    groupId: 1,
    faces: icon,
    endpointName: 'Endpoint Name 1',
    endpointId: 'Endpoint ID 1',
    endpointType: 'iPad',
    location: 'Location 1',   
  },
  {
    key: '2',
    groupId: 2,
    faces: icon,
    endpointName: 'Endpoint Name 2',
    endpointType: 'IP Camera',
    endpointId: 'Endpoint ID 2',
    location: 'Location 2',
  },
  {
    key: '3',
    groupId: 3,
    faces: icon,
    endpointName: 'Endpoint Name 3',
    endpointType: 'Android Tablet',
    endpointId: 'Endpoint ID 2',
    location: 'Location 3',
  },
  {
    key: '4',
    groupId: 4,
    faces: icon,
    endpointName: 'Endpoint Name 4',
    endpointType: 'iPad',
    endpointId: 'Endpoint ID 4',
    location: 'Location 4',
  },
  {
    key: '5',
    groupId: 5,
    faces: icon,
    endpointName: 'Endpoint Name 5',
    endpointType: 'IP Camera',
    endpointId: 'Endpoint ID 5',
    location: 'Location 5',
  },
  {
    key: '6',
    groupId: 6,
    faces: icon,
    endpointName: 'Endpoint Name 6',
    endpointType: 'Android Tablet',
    endpointId: 'Endpoint ID 6',
    location: 'Location 6',
  },
  {
    key: '7',
    groupId: 7,
    faces: icon,
    endpointName: 'Endpoint Name 7',
    endpointType: 'Android Tablet',
    endpointId: 'Endpoint ID 7',
    location: 'Location 7',
  },
  {
    key: '8',
    groupId: 8,
    faces: icon,
    endpointName: 'Endpoint Name 8',
    endpointType: 'IP Camera',
    endpointId: 'Endpoint ID 8',
    location: 'Location 8',
  },
  {
    key: '9',
    groupId: 9,
    faces: icon,
    endpointName: 'Endpoint Name 9',
    endpointType: 'IP Camera',
    endpointId: 'Endpoint ID 9',
    location: 'Location 9',
  },
  {
    key: '10',
    groupId: 10,
    faces: icon,
    endpointName: 'Endpoint Name 10',
    endpointType: 'iPad',
    endpointId: 'Endpoint ID 10',
    location: 'Location 10',
  },
  {
    key: '11',
    groupId: 11,
    faces: icon,
    endpointName: 'Endpoint Name',
    endpointType: 'iPad',
    endpointId: 'Endpoint ID 11',
    location: 'Location 11',
  },
]
export const integrations = [
  {
    key: '1',
    endpointName: 'Kronos',
    descriptions:'Punch into Kronos Time and Attendence System by verifying face',
    image: kronos,
    instaled: true,
    action: true,
  },
  {
    key: '2',
    endpointName: 'Securits',
    descriptions:'Authorize entry to restriced areas by verifying face',
    image: securits,
    instaled: true,
    action: false,
  },
  {
    key: '3',
    endpointName: 'Access Control System',
    descriptions:'Integrate face authrntication to your legacy Access control system',
    image: false,
    instaled: false,
    action: true,
  },
  {
    key: '4',
    endpointName: 'Custom',
    descriptions:'Custom integration',
    image: false,
    instaled: false,
    action: true,
  }
]
export const enabledintegrations = [
  {
    key: '1',
    endpointName: 'Connection1',
    source: 'Workday',
    action: true,
  },
  {
    key: '2',
    endpointName: 'Connection2',
    source: 'Active Directive',
    action: false,
  },
  {
    key: '3',
    endpointName: 'Connection3',
    source: 'Envoy',
    action: true,
  }
]
export const cameras = [
 
]
export const userGroup=[
  {
    key: '1',
    id: 1,
    group:'Group 1',
    description: 'Desc 1',
    assignment:'Manual'
  },
  {
    key: '2',
    id: 2,
    group:'Group 2',
    description: 'Desc 2',
    assignment:'Programmatic'
  },
  {
    key: '3',
    id: 3,
    group:'Group 3',
    description: 'Desc 3',
    assignment:'Manual'
  },
  {
    key: '4',
    id: 4,
    group:'Group 4',
    description: 'Desc 4',
    assignment:'Programmatic'
  },
  {
    key: '5',
    id: 5,
    group:'Group 5',
    description: 'Desc 5',
    assignment:'Manual'
  },
  {
    key: '6',
    id: 6,
    group:'Group 6',
    description: 'Desc 6',
    assignment:'Manual'
  },
  {
    key: '7',
    id: 7,
    group:'Group 7',
    description: 'Desc 7',
    assignment:'Programmatic'
  },
  {
    key: '8',
    id: 8,
    group:'Group 8',
    description: 'Desc 8',
    assignment:'Manual'
  },
  {
    key: '9',
    id: 9,
    group:'Group 9',
    description: 'Desc 9',
    assignment:'Programmatic'
  },
  {
    key: '10',
    id: 10,
    group:'Group 10',
    description: 'Desc 10',
    assignment:'Programmatic'
  },
  {
    key: '11',
    id: 11,
    group:'Group 11',
    description: 'Desc 11',
    assignment:'Manual'
  },
]



