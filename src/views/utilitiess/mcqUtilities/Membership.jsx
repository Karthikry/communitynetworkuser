import React, { useEffect, useState } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Avatar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Tune } from '@mui/icons-material';
import maleImage from '../../../assets/images/Male-removebg-preview.png';
import femaleImage from '../../../assets/images/Female-removebg-preview.png';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Tree, TreeNode } from 'react-organizational-chart';

const FamilyTree = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openFamilyTreeDialog, setOpenFamilyTreeDialog] = useState(false);
  const [selectedMemberDetails, setSelectedMemberDetails] = useState(null);
  const [selectedFamilyTree, setSelectedFamilyTree] = useState(null);
  const [loading, setLoading] = useState(false);

  const FamilyMemberCard = ({ member }) => (
    <Card
      style={{
        backgroundColor: member.isAlive ? '#90EE90' : '#ee6b6e',
        margin: '10px',
        minWidth: '120px',
      }}
    >
      <CardContent style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={member.gender === 'MALE' ? maleImage : femaleImage}
          alt={member.gender === 'MALE' ? 'Male' : 'Female'}
          style={{ width: 50, height: 50 }}
        />
        <Typography variant="body1" color="white">
          {member.fullName}
        </Typography>
      </CardContent>
    </Card>
  );

  const fetchSearchResults = async (query) => {
    setLoading(true);
    setError('');
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const accessToken = user?.accessToken || '';

      const response = await axios.get(
        `https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/findMembershipByFullName?fullName=${query}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSearchResults(response.data || []);
    } catch (err) {
      setError('Failed to fetch results');
    }
    setLoading(false);
  };

  const fetchFamilyTreeData = async (membershipCode) => {
    setLoading(true);
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const accessToken = user?.accessToken || '';

      const response = await axios.get(
        `https://executivetracking.cloudjiffy.net/MahaasabhaMember/membership/v1/findMembershipAssociationByMembershipCode/{membershipCode}?membershipCode=${membershipCode}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSelectedFamilyTree(response.data);
      setOpenFamilyTreeDialog(true);
    } catch (err) {
      setError('Failed to fetch family tree data');
    }
    setLoading(false);
  };

  const fetchMemberDetails = async (membershipCode) => {
    setLoading(true);
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const accessToken = user?.accessToken || '';

      const response = await axios.get(
        `https://executivetracking.cloudjiffy.net/MahaasabhaMember/membership/v1/findMembershipAssociationByMembershipCode/{membershipCode}?membershipCode=${membershipCode}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSelectedMemberDetails(response.data);
      setOpenDialog(true);
    } catch (err) {
      setError('Failed to fetch member details');
    }
    setLoading(false);
  };

  const renderFamilyTree = (member) => (
    <div>
     <TreeNode label={<FamilyMemberCard member={member} />}>
      {member.parentsDTO &&
        member.parentsDTO.map((parent, index) => (
          <TreeNode key={`parent-${index}`} label={<FamilyMemberCard member={parent} />}>
            {/* <TreeNode label={<Typography></Typography>}/> */}
            {parent.spouses &&
              parent.spouses.map((spouse, spouseIndex) => (
                <TreeNode key={`parent-spouse-${spouseIndex}`} label={<FamilyMemberCard member={spouse} />} />
              ))}
          </TreeNode>
        ))}
      {member.siblingsDto && member.siblingsDto.length > 0 && (
        <TreeNode label={<Typography variant="body1" color="primary">Siblings</Typography>}>
          {member.siblingsDto.map((sibling, siblingIndex) => (
            <TreeNode key={`sibling-${siblingIndex}`} label={<FamilyMemberCard member={sibling} />} />
          ))}
        </TreeNode>
      )}
      {member.spouseDto && member.spouseDto.length > 0 && (
        <TreeNode label={<Typography variant="body1" color="primary">Spouse</Typography>}>
          {member.spouseDto.map((spouse, spouseIndex) => (
            <TreeNode key={`spouse-${spouseIndex}`} label={<FamilyMemberCard member={spouse} />} />
          ))}
        </TreeNode>
      )}
      {member.childrenDto && member.childrenDto.length > 0 && (
        <TreeNode label={<Typography variant="body1" color="primary">Children</Typography>}>
          {member.childrenDto.map((child) => renderFamilyTree(child))}
        </TreeNode>
      )}
   </TreeNode>
    </div>
  );

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      fetchSearchResults(searchQuery);
    }
  };

  const renderMemberCard = (member) => {
    const isMale = member.gender === 'MALE';
    return (
      <Grid item xs={12} sm={6} md={4} key={member.membershipCode}>
        <Card
          style={{
            backgroundColor: member.isAlive ? 'lightgreen' : 'lightcoral',
            marginBottom: '20px',
          }}
        >
          <CardContent>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
              <img
                src={isMale ? maleImage : femaleImage}
                alt={isMale ? 'Male' : 'Female'}
                style={{ width: 50, height: 50 }}
              />
            </div>
            <Typography variant="h4" textAlign={'center'}>{member.fullName}</Typography>
{/*             
            <Typography variant="body1">
              <strong>Date of Birth:</strong> {new Date(member.dob).toLocaleDateString()}
            </Typography>
            <Typography variant="body1">
              <strong>Application Number:</strong> {member.applicationNumber}
            </Typography>
            <Typography variant="body1">
              <strong>Membership Code:</strong> {member.membershipCode}
            </Typography>
            <Typography variant="body1">
              <strong>Reference Membership Code:</strong> {member.referanceMembershipCode}
            </Typography>
            <Typography variant="body1">
              <strong>Female Family Ref Membership Code:</strong> {member.femaleFamilyRefMembershipCode}
            </Typography>
            <Typography variant="body1">
              <strong>Status:</strong> {member.isAlive ? 'Alive' : 'Deceased'}
            </Typography>
            <Typography variant="body1">
              <strong>Married:</strong> {member.isMarried ? 'Yes' : 'No'}
            </Typography>
            <Typography variant="body1">
              <strong>Age:</strong> {member.age}
            </Typography> */}

            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: '15px' }}>
              <Button
                variant="contained"
                style={{ backgroundColor: 'white', color: 'blue', border: '1px solid blue', }}
                onClick={() => fetchFamilyTreeData(member.membershipCode)}
              >
                Family Tree
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: 'white', color: 'purple', border: '1px solid purple' }}
                onClick={() => fetchMemberDetails(member.membershipCode)}
              >
                Personal Text
              </Button>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: '10px' }}>

              {member.gender == "MALE"  ? <Button
                variant="contained"
                style={{ backgroundColor: 'white', color: 'blue', border: '1px solid blue' }}
                onClick={() => fetchFamilyTreeData(member.membershipCode)}
              >Root Family Tree</Button>:""}



              {member.gender == "FEMALE" && member.isMarried == true ? <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: '1px' }}>
              <Button
                variant="contained"
                style={{ backgroundColor: 'white', color: 'blue', border: '1px solid blue', }}
              >
                Husband Root Family Tree
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: 'white', color: 'purple', border: '1px solid purple' }}
              >
                Father Root Family Tree
              </Button>
            </div> :<div> {member.gender == "FEMALE" && member.isMarried == false ? <Button
                variant="contained"
                style={{ backgroundColor: 'white', color: 'purple', border: '1px solid purple' }}
              >
                Father Root Family Tree
              </Button>:""}</div>}



              {/* <Button
                variant="contained"
                style={{ backgroundColor: 'white', color: 'blue', border: '1px solid blue' }}
                onClick={() => fetchFamilyTreeData(member.membershipCode)}
              >
                Family Tree
              </Button> */}
              {/* <Button
                variant="contained"
                style={{ backgroundColor: 'white', color: 'purple', border: '1px solid purple' }}
                onClick={() => fetchMemberDetails(member.membershipCode)}
              >
                Personal Text
              </Button> */}
              
            </div>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleSearch} style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <TextField
          placeholder="Search a FullName"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '70%' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch} color="primary">
                  <SearchIcon />
                </IconButton>
                <IconButton color="primary">
                  <Tune />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>

      {loading && <CircularProgress style={{ marginTop: '20px' }} />}

      {error && <Typography color="error">{error}</Typography>}

      <Grid container spacing={3} style={{ padding: '10px' }}>
        {searchResults.map((member) => renderMemberCard(member))}
      </Grid>

      <Dialog open={openFamilyTreeDialog} onClose={() => setOpenFamilyTreeDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>Family Tree</DialogTitle>
        <DialogContent>
          {selectedFamilyTree && (
            <Tree
              lineWidth={'2px'}
              lineColor={'blue'}
              lineBorderRadius={'10px'}
              // label={<FamilyMemberCard member={selectedFamilyTree} />}
            >
              {renderFamilyTree(selectedFamilyTree)}
            </Tree>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Personal Details</DialogTitle>
        <DialogContent>
        {selectedMemberDetails ? (
            <div>
              {/* Additional personal details rendering logic can go here */}

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          { <img
                src={selectedMemberDetails.gender === 'MALE' ? maleImage : femaleImage}
                alt={selectedMemberDetails.gender === 'MALE' ? 'Male' : 'Female'}
                style={{ width: 50, height: 50 }}
              />}
          <Typography variant="h5" style={{ backgroundColor: selectedMemberDetails.isAlive  ? 'lightgreen' : 'lightpink', padding: '5px', borderRadius: '5px', marginLeft: '10px' }}>
            {selectedMemberDetails.fullName}
          </Typography>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <Typography variant="h6" color="primary">Parents</Typography>
          {selectedMemberDetails.parentsDTO && selectedMemberDetails.parentsDTO.length > 0 ? (
            selectedMemberDetails.parentsDTO.map((parent) => (
              <div key={parent.membershipId} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                { <img
                src={parent.gender === 'MALE' ? maleImage : femaleImage}
                alt={parent.gender === 'MALE' ? 'Male' : 'Female'}
                style={{ width: 50, height: 50 }}
              />}
               <Button onClick={() =>  fetchMemberDetails(parent.membershipCode)}>
              <Typography  variant="body1" style={{ backgroundColor: parent.isAlive  ? 'lightgreen' : 'lightpink', padding: '5px', borderRadius: '5px', marginLeft: '10px' }}>
                  {parent.fullName}
                </Typography>
              </Button>
              </div>
              {parent.spouses && parent.spouses.length > 0 && parent.spouses.map((spouse) => (
                <div key={spouse.membershipId} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  { <img
                src={spouse.gender === 'MALE' ? maleImage : femaleImage}
                alt={spouse.gender === 'MALE' ? 'Male' : 'Female'}
                style={{ width: 50, height: 50 }}
              />}
                  <Button onClick={() =>  fetchMemberDetails(spouse.membershipCode)}>
              <Typography  variant="body1" style={{ backgroundColor: spouse.isAlive  ? 'lightgreen' : 'lightpink', padding: '5px', borderRadius: '5px', marginLeft: '10px' }}>
                  {spouse.fullName}
                </Typography>
              </Button>
                </div>
              ))}
            </div>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">No parents data found.</Typography>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <Typography variant="h6" color="primary">Siblings</Typography>
          {selectedMemberDetails.siblingsDto && selectedMemberDetails.siblingsDto.length > 0 ? (
            selectedMemberDetails.siblingsDto.map((sibling) => (
              <div key={sibling.membershipId} style={{ display: 'flex', alignItems: 'center' , gap:5}}>
              { <img
                src={sibling.gender === 'MALE' ? maleImage : femaleImage}
                alt={sibling.gender === 'MALE' ? 'Male' : 'Female'}
                style={{ width: 50, height: 50 }}
              />}
              <Button onClick={() =>  fetchMemberDetails(sibling.membershipCode)}>
              <Typography  variant="body1" style={{ backgroundColor: sibling.isAlive  ? 'lightgreen' : 'lightpink', padding: '5px', borderRadius: '5px', marginLeft: '10px' }}>
                  {sibling.fullName}
                </Typography>
              </Button><br /><br />
              </div>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">No siblings data found.</Typography>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <Typography variant="h6" color="primary">Spouse</Typography>
          {selectedMemberDetails.spouseDto && selectedMemberDetails.spouseDto.length > 0 ? (
            selectedMemberDetails.spouseDto.map((spouse) => (
              <div key={spouse.membershipId} style={{ display: 'flex', alignItems: 'center' }}>
                { <img
                src={spouse.gender === 'MALE' ? maleImage : femaleImage}
                alt={spouse.gender === 'MALE' ? 'Male' : 'Female'}
                style={{ width: 50, height: 50 }}
              />}
                <Button onClick={() =>  fetchMemberDetails(spouse.membershipCode)}>
              <Typography  variant="body1" style={{ backgroundColor: spouse.isAlive  ? 'lightgreen' : 'lightpink', padding: '5px', borderRadius: '5px', marginLeft: '10px' }}>
                  {spouse.fullName}
                </Typography>
              </Button>
                
              </div>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">No spouse data found.</Typography>
          )}
        </div>

        <div>
          <Typography variant="h6" color="primary">Children</Typography>
          {selectedMemberDetails.childrenDto && selectedMemberDetails.childrenDto.length > 0 ? (
            selectedMemberDetails.childrenDto.map((child) => (
              <div key={child.membershipId} style={{ display: 'flex', alignItems: 'center', gap:5 }}>
                { <img
                src={child.gender === 'MALE' ? maleImage : femaleImage}
                alt={child.gender === 'MALE' ? 'Male' : 'Female'}
                style={{ width: 50, height: 50 }}
              />}
                <Button onClick={() =>  fetchMemberDetails(child.membershipCode)}>
              <Typography  variant="body1" style={{ backgroundColor: child.isAlive  ? 'lightgreen' : 'lightpink', padding: '5px', borderRadius: '5px', marginLeft: '10px' }}>
                  {child.fullName}
                </Typography>
              </Button>
                <br /><br />
              </div>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">No children data found.</Typography>
          )}
        </div>
            </div>
          ) : (
            <Typography>Loading details...</Typography>
          )}
         
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FamilyTree;