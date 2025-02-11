import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { builderData } from '../misc/constant';

interface EditSkillsProps {
  setSkillAction: (payload: { skill: string }) => { type: string; payload: { skill: string } };
  removeSkillAction: (payload: { skill: string }) => { type: string; payload: { skill: string } };
  skillsData: string[]; 
}

const EditSkills = ({ setSkillAction, removeSkillAction, skillsData }: EditSkillsProps) => {  
  
  const dispatch = useDispatch<AppDispatch>();

  const [allSkills, setAllSkills] = useState<string[]>(builderData.skills);
  const [filteredSkills, setFilteredSkills] = useState<string[]>(builderData.skills);
  const [newSkill, setNewSkill] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);  

  const handleDivClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSkill(e.target.value);
    setShowDropdown(true);
    const searchValue = e.target.value.toLowerCase();
    setFilteredSkills(allSkills.filter(skill => skill.toLowerCase().includes(searchValue)));
  };

  const handleSkillKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      handleAddSkill(newSkill.trim());
      e.preventDefault();
    }
    setShowDropdown(false);
  };

  const handleAddSkill = (skill: string) => {
    if (skill && !skillsData?.includes(skill)) {      
      dispatch(setSkillAction({ skill }));
      setNewSkill('');
      setShowDropdown(false);
      setAllSkills(prev => prev.filter(s => s !== skill));
      setFilteredSkills(prev => prev.filter(s => s !== skill));
    }
  };

  const handleRemoveSkill = (skill: string) => {
    dispatch(removeSkillAction({ skill }));
    setAllSkills(prev => prev.filter(s => s !== skill));
    setFilteredSkills(prev => [...prev, skill].filter(s => s.toLowerCase().includes(newSkill.toLowerCase())));
  };

  return (
    <div className="relative w-full border-2 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 flex flex-col focus-within:border-black">
      <label className="text-sm" htmlFor="skills">Skills</label>
      <div className="p-2 flex flex-wrap gap-2 cursor-text" onClick={handleDivClick}>
        {skillsData && skillsData.map((skill: string) => (
          <span key={skill} className="bg-gray-200 hover:bg-gray-300 font-semibold p-2 rounded flex items-center cursor-pointer">
            {skill}
            <span className="ml-1 text-black hover:text-gray-700" onClick={() => handleRemoveSkill(skill)}>
              ×
            </span>
          </span>
        ))}
        <input
          type="text"
          className="mt-2 outline-none"
          value={newSkill}
          ref={inputRef}
          onChange={handleSkillChange}
          onKeyDown={handleSkillKeyPress}
          placeholder="Type a skill..."
        />
      </div>
      {showDropdown && filteredSkills.length > 0 && (
        <div className="z-20 top-full left-0 w-full bg-white border-2 rounded-2xl shadow-lg">
          <div className="p-2 border-b">Popular Skills</div>
          {filteredSkills.length === 0 ? (
            <div className="p-2 text-center text-gray-600">No results found</div>
          ) : (
            <div className="p-2 flex flex-wrap gap-2">
              {filteredSkills.slice(0, 6).map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-200 p-2 font-semibold rounded cursor-pointer hover:bg-gray-300"
                  onClick={() => handleAddSkill(skill)}
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EditSkills;
