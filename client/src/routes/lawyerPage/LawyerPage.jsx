import "./LawyerPage.scss";
import CardForLawyer from"../../components/cardForLawyer/CardForLawyer"
import {listData} from"../../lib/dummydata"


function LawyerPage() {

  return  <div className="profilePage">
            <div className='list'>
            {listData.map(item=>( 
                <CardForLawyer key={item.id} item={item}/>  
            ))}
            </div>	
	      </div>
            
}

export default LawyerPage;

