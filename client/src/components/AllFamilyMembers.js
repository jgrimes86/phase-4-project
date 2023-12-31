
import { useParams, useOutletContext } from "react-router-dom";

function AllFamilyMembers({addToJoinTable, setAllFamily, allFamily}) {
    const {invitedFamily, setInvitedFamily} = useOutletContext()
    const { id } = useParams()

    console.log(allFamily)

    ///////////////////////// INVITE FAMILY MEMBER //////////////////////
    function inviteFamilyMember(fm) {
        setInvitedFamily([...invitedFamily, fm]);
        addToJoinTable(fm)
    }

    /////////////////////////// UNINVITE FAMILY MEMBER ///////////////////
    function uninviteFamilyMember(fm) {
        fetch('/uninvite/'+fm.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "event_id": id
            })
        })
        .then(r => {
            if (r.ok) {
                setInvitedFamily(invitedFamily.filter(member => {
                    if (member.id !== fm.id) return member
                }))
            }
        })
    }

    ////////////////////// DELETE FAMILY MEMBER ////////////////////////
    function deleteFamilyMember(fm) {
        const shouldDelete = window.confirm("Are you sure you want to delete this family member?");
      
        if (shouldDelete) {
          fetch('/family_members/' + fm.id, {
            method: 'DELETE'
          })
            .then(r => {
              if (r.ok) {
                setInvitedFamily(invitedFamily.filter(member => member.id !== fm.id));
                setAllFamily(allFamily.filter(member => member.id !== fm.id));
              }
            })
            .catch(error => console.error("Error deleting family member:", error));
        }
      }



    ////////////////////////// family member list ////////////////////////


    const familyMemberList = allFamily.map(fm => {
        const invitedIds = invitedFamily.map(member => member.id)
        const isInvited = invitedIds.includes(fm.id)
        return (
            <li>
                <span key={fm.id}>{`${fm.first_name}`+" "+`${fm.last_name}`}</span>
                {isInvited ? <button style={{backgroundColor: "#218838"}} className = "uninvitebutton" onClick={() => uninviteFamilyMember(fm)}>Uninvite</button> : <button onClick={() => inviteFamilyMember(fm)}>Invite</button>}
                <button className = "deletebutton" onClick={() => {deleteFamilyMember(fm)}}>X</button>
            </li>
            
        )
    })

    return (
        <div>
            <h3 className = "selectfamilymembertext">Select Family Members to Invite:</h3>
            <ul className = "familymemberoptions">
                {familyMemberList}
            </ul>
        </div>
    )
}

export default AllFamilyMembers
