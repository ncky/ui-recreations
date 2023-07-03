import React, { useState } from 'react';
import './styles.css';
// import './App.css';


function App() {

  const sidebarNavButtons = [
    {label: 'Import/Export Build'},
    {label: 'Notes'},
    {label: 'Configuration'},
    {label: 'Tree',},
    {label: 'Skills'},
    {label: 'Items'},
    {label: 'Calcs'}
  ];

  const [mainViewState, setMainViewState] = useState(6)

  const [sidebarCalcsData] = useState([
    { label: 'avg dmg', value: '20', color: '' },
    { label: 'atk rate', value: '1.3', color: '' },
    { label: 'hit chance', value: '73%', color: '' },
    { label: '', value: '', color: 'pob-hide' },
    { label: 'Strength', value: '20', color: 'pob-orange' },
    { label: 'Dexterity', value: '37', color: 'pob-green' },
    { label: 'Intelligence', value: '80', color: 'pob-blue' },
    { label: '', value: '', color: 'pob-hide' },
    { label: 'Effective Hit Pool', value: '60', color: '' },
    { label: 'Phys Max Hit', value: '60', color: 'pob-gray' },
    { label: 'Elemental Max Hit', value: '38', color: 'pob-yellow' },
    { label: 'Chaos Max Hit', value: '38', color: 'pob-pink' },
    { label: '', value: '', color: 'pob-hide' },
    { label: 'Total Life', value: '60', color: 'pob-orange' },
    { label: '', value: '', color: 'pob-hide' },
    { label: 'Total Mana', value: '50', color: 'pob-blue' },
    { label: 'Mana Regen', value: '0.9', color: 'pob-blue' },
    { label: '', value: '', color: 'pob-hide' },
    { label: 'Evasion Rating', value: '16', color: 'pob-green' },
    { label: '', value: '', color: 'pob-hide' },
    { label: 'Phys. Damage Reduction', value: '0%', color: 'pob-gray' },
    { label: '', value: '', color: 'pob-hide' },
    { label: 'Fire Resistance', value: '-60%', color: 'pob-orange' },
    { label: 'Cold Resistance', value: '-60%', color: 'pob-blue' },
    { label: 'Fire Resistance', value: '-60%', color: 'pob-yellow' },
    { label: 'Chaos Resistance', value: '-60%', color: 'pob-pink' },
    { label: '', value: '', color: 'pob-hide' },
    { label: 'Movement Speed Modifier', value: '+0%', color: '' }
  ]);

  const [sidebarNotificationData, setSidebarNotificationData] = useState(
    {title: 'Update Available', body: 'An update has been downloaded and is ready to be applied.', buttontext: 'Dismiss', enabled: true}
  );






  return (
    <div className="App">
      <TopBar />
      <SideBar sidebarNavButtons={sidebarNavButtons} mainViewState={mainViewState} setMainViewState={setMainViewState} sidebarCalcsData={sidebarCalcsData} sidebarNotificationData={sidebarNotificationData} setSidebarNotificationData={setSidebarNotificationData}/>
      <MainView mainViewState={mainViewState} />
      

    </div>
  );
}

function TopBar() {
  return (
    <div class="topbar">
      <div class="topbar-cluster topbar-left">
          <div class="pob-button" href="#back">&lt;&lt; Back</div>
          <div class="currentbuild">Current build:
              <div class="buildname pob-box">Unnamed Build</div>
          </div>
          <div class="pob-button">Save</div>
          <div class="pob-button pob-disabled">Save As</div>
      </div>
      <div class="topbar-cluster topbar-center">
          <div class="passive-point-stats pob-box">
              <div>0 / 123</div>
              <div>0 / 8</div>
          </div>
          <div class="character-level pob-box">Level: 1
              <div class="topbar-level-buttons">
                  <div class="pob-button">+</div>
                  <div class="pob-button">-</div>
              </div>
          </div>
          <div class="character-class pob-box pob-dropdown">Scion</div>
          <div class="character-ascendancy pob-box pob-dropdown">None</div>
      </div>
    </div>
  );
}

function SideBar(props){
  return (
    <div class="sidebar">
        <SideBarNavcon sidebarNavButtons={props.sidebarNavButtons} setMainViewState={props.setMainViewState} mainViewState={props.mainViewState}/>
        
        <div class="sidebar-skillselector">
            Main Skill:
            <div class="pob-box pob-dropdown">&lt;No skills added yet&gt;</div>
        </div>

        <SideBarCalcs data={props.sidebarCalcsData}/>

        <SideBarNotification data={props.sidebarNotificationData} setData={props.setSidebarNotificationData}/>

        <SideBarFooter />
        
    </div>
  );
}

function SideBarNavcon(props){

  const handleClick = (index) => {
    const newViewState = index
    props.setMainViewState(newViewState);
  };

  return (
    <div class="sidebar-navcon">
      {props.sidebarNavButtons.map((line, index) => (
        <div
          key={index}
          className={`pob-button ${index === props.mainViewState ? 'pob-selected' : ''}`}
          onClick={() => handleClick(index)}
        >
          {line.label}
        </div>
      ))}
    </div>
  );
}

function SideBarCalcs(props){
  
  return (
    <div class="sidebar-calcs">
      {props.data.map((line, index) => (
        <div key={index} className={`sidebar-calc-line ${line.color || ''}`}>
          {line.label}:
          <div className={`${line.value.includes('-') ? 'pob-red' : 'pob-white'}`}>
            {line.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function SideBarNotification(props){

  const handleClick = () => {
    const newData = {...props.data, enabled: !props.data.enabled};
    props.setData(newData);
  }
  
  return (
    props.data.enabled ?
      <div class="sidebar-notification">
              <div class="sidebar-notification-title">{props.data.title}</div>
              <div class="sidebar-notification-body">{props.data.body}</div>
              <div class="sidebar-notification-button pob-button" onClick={() => handleClick()}>{props.data.buttontext}</div>
      </div>
      :
      null
  );
}

function SideBarFooter(props){
  return (
    <div class="sidebar-footer">
        <div class="sidebar-footer-splitter">
            <div class="pob-button pob-green">Update Ready</div>
            <div class="pob-button">Options</div>
            <div class="pob-button">About</div>
        </div>
        <div class="sidebar-footer-splitter">
            <div class="pob-text">pob html css</div>
            <div class="pob-text">version: 0</div>
        </div>
    </div>
  );
}


function MainView(props) {
  const views = [<MainViewImport />, <MainViewNotes />, <MainViewConfig />, <MainViewTree />, <MainViewSkills />, <MainViewItems />, <MainViewCalcs />];

  const RenderedView = () => {
    return views[props.mainViewState];
  };

  return <RenderedView />;
}

function MainViewImport() { //import export build
  return (
    <div class="main-view">
      <div class="pob-text">import export build</div>
      <div class="pob-text">0</div>
      <div class="pob-text temp-text">pob web test</div>
    </div>
  )
}

function MainViewNotes() { //notes
  return (
    <div class="main-view">
      <div class="pob-text">notes</div>
      <div class="pob-text">1</div>
      <div class="pob-text temp-text">pob web test</div>
    </div>
  )
}

function MainViewConfig() { //config
  return (
    <div class="main-view">
      <div class="pob-text">config</div>
      <div class="pob-text">2</div>
      <div class="pob-text temp-text">pob web test</div>
    </div>
  )
}

function MainViewTree() { //tree
  return (
    <div class="main-view">
      <div class="pob-text">tree</div>
      <div class="pob-text">3</div>
      <div class="pob-text temp-text">pob web test</div>
    </div>
  )
}

function MainViewSkills() { //skills
  return (
    <div class="main-view">
      <div class="pob-text">skills</div>
      <div class="pob-text">4</div>
      <div class="pob-text temp-text">pob web test</div>
    </div>
  )
}
function MainViewItems() { //items
  return (
    <div class="main-view">
      <div class="pob-text">items</div>
      <div class="pob-text">5</div>
      <div class="pob-text temp-text">pob web test</div>
    </div>
  )
}

function MainViewCalcs() { //calcs
  return (
    <div class="main-view">
      <div class="pob-text">calcs</div>
      <div class="pob-text">6</div>
      <div class="pob-text temp-text">pob web test</div>
    </div>
  )
}

export default App;
