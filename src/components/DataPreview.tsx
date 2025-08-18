import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Plus, Trash2, Save, X } from 'lucide-react';
import { CVData } from '../types';

interface DataPreviewProps {
  cvData: CVData;
  onDataUpdate: (data: CVData) => void;
  onNext: () => void;
  onBack: () => void;
}

export const DataPreview: React.FC<DataPreviewProps> = ({
  cvData,
  onDataUpdate,
  onNext,
  onBack
}) => {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editData, setEditData] = useState<CVData>(cvData);

  const handleSave = () => {
    onDataUpdate(editData);
    setEditingSection(null);
  };

  const handleCancel = () => {
    setEditData(cvData);
    setEditingSection(null);
  };

  const addExperience = () => {
    const newExperience = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false
    };
    setEditData({
      ...editData,
      experience: [...editData.experience, newExperience]
    });
  };

  const removeExperience = (id: string) => {
    setEditData({
      ...editData,
      experience: editData.experience.filter(exp => exp.id !== id)
    });
  };

  const addSkill = () => {
    const newSkill = {
      id: `skill-${Date.now()}`,
      name: '',
      category: 'technical' as const,
      level: 3
    };
    setEditData({
      ...editData,
      skills: [...editData.skills, newSkill]
    });
  };

  const removeSkill = (id: string) => {
    setEditData({
      ...editData,
      skills: editData.skills.filter(skill => skill.id !== id)
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Review & Edit Your Information
        </h2>
        <p className="text-lg text-gray-600">
          Our AI has extracted the following information. You can edit or add any details.
        </p>
      </div>

      <div className="space-y-8">
        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
            <button
              onClick={() => setEditingSection(editingSection === 'personal' ? null : 'personal')}
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              {editingSection === 'personal' ? <X className="h-5 w-5" /> : <Edit2 className="h-5 w-5" />}
            </button>
          </div>

          {editingSection === 'personal' ? (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={editData.personalInfo.name}
                    onChange={(e) => setEditData({
                      ...editData,
                      personalInfo: { ...editData.personalInfo, name: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={editData.personalInfo.email}
                    onChange={(e) => setEditData({
                      ...editData,
                      personalInfo: { ...editData.personalInfo, email: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={editData.personalInfo.phone}
                    onChange={(e) => setEditData({
                      ...editData,
                      personalInfo: { ...editData.personalInfo, phone: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={editData.personalInfo.location}
                    onChange={(e) => setEditData({
                      ...editData,
                      personalInfo: { ...editData.personalInfo, location: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                  <input
                    type="url"
                    value={editData.personalInfo.linkedin || ''}
                    onChange={(e) => setEditData({
                      ...editData,
                      personalInfo: { ...editData.personalInfo, linkedin: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                  <input
                    type="url"
                    value={editData.personalInfo.github || ''}
                    onChange={(e) => setEditData({
                      ...editData,
                      personalInfo: { ...editData.personalInfo, github: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  value={editData.personalInfo.bio || ''}
                  onChange={(e) => setEditData({
                    ...editData,
                    personalInfo: { ...editData.personalInfo, bio: e.target.value }
                  })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="A brief description about yourself..."
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Name:</span>
                <p className="font-medium">{cvData.personalInfo.name}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Email:</span>
                <p className="font-medium">{cvData.personalInfo.email}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Phone:</span>
                <p className="font-medium">{cvData.personalInfo.phone}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Location:</span>
                <p className="font-medium">{cvData.personalInfo.location}</p>
              </div>
              {cvData.personalInfo.bio && (
                <div className="md:col-span-2">
                  <span className="text-sm text-gray-500">Bio:</span>
                  <p className="font-medium">{cvData.personalInfo.bio}</p>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Experience</h3>
            <div className="flex space-x-2">
              {editingSection === 'experience' && (
                <button
                  onClick={addExperience}
                  className="text-green-600 hover:text-green-700 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                </button>
              )}
              <button
                onClick={() => setEditingSection(editingSection === 'experience' ? null : 'experience')}
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                {editingSection === 'experience' ? <X className="h-5 w-5" /> : <Edit2 className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {(editingSection === 'experience' ? editData : cvData).experience.map((exp, index) => (
              <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
                {editingSection === 'experience' ? (
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="grid md:grid-cols-2 gap-3 flex-1">
                        <input
                          type="text"
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => {
                            const updatedExp = [...editData.experience];
                            updatedExp[index] = { ...exp, company: e.target.value };
                            setEditData({ ...editData, experience: updatedExp });
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="Position"
                          value={exp.position}
                          onChange={(e) => {
                            const updatedExp = [...editData.experience];
                            updatedExp[index] = { ...exp, position: e.target.value };
                            setEditData({ ...editData, experience: updatedExp });
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="month"
                          placeholder="Start Date"
                          value={exp.startDate}
                          onChange={(e) => {
                            const updatedExp = [...editData.experience];
                            updatedExp[index] = { ...exp, startDate: e.target.value };
                            setEditData({ ...editData, experience: updatedExp });
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="month"
                          placeholder="End Date"
                          value={exp.endDate}
                          disabled={exp.current}
                          onChange={(e) => {
                            const updatedExp = [...editData.experience];
                            updatedExp[index] = { ...exp, endDate: e.target.value };
                            setEditData({ ...editData, experience: updatedExp });
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        />
                      </div>
                      <button
                        onClick={() => removeExperience(exp.id)}
                        className="text-red-600 hover:text-red-700 transition-colors ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`current-${exp.id}`}
                        checked={exp.current}
                        onChange={(e) => {
                          const updatedExp = [...editData.experience];
                          updatedExp[index] = { ...exp, current: e.target.checked };
                          setEditData({ ...editData, experience: updatedExp });
                        }}
                        className="mr-2"
                      />
                      <label htmlFor={`current-${exp.id}`} className="text-sm text-gray-600">
                        Current position
                      </label>
                    </div>
                    <textarea
                      placeholder="Description"
                      value={exp.description}
                      onChange={(e) => {
                        const updatedExp = [...editData.experience];
                        updatedExp[index] = { ...exp, description: e.target.value };
                        setEditData({ ...editData, experience: updatedExp });
                      }}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                        <p className="text-blue-600 font-medium">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{exp.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {editingSection === 'experience' && (
            <div className="flex space-x-3 mt-4">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Skills</h3>
            <div className="flex space-x-2">
              {editingSection === 'skills' && (
                <button
                  onClick={addSkill}
                  className="text-green-600 hover:text-green-700 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                </button>
              )}
              <button
                onClick={() => setEditingSection(editingSection === 'skills' ? null : 'skills')}
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                {editingSection === 'skills' ? <X className="h-5 w-5" /> : <Edit2 className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {editingSection === 'skills' ? (
            <div className="space-y-3">
              {editData.skills.map((skill, index) => (
                <div key={skill.id} className="flex items-center space-x-3">
                  <input
                    type="text"
                    placeholder="Skill name"
                    value={skill.name}
                    onChange={(e) => {
                      const updatedSkills = [...editData.skills];
                      updatedSkills[index] = { ...skill, name: e.target.value };
                      setEditData({ ...editData, skills: updatedSkills });
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <select
                    value={skill.category}
                    onChange={(e) => {
                      const updatedSkills = [...editData.skills];
                      updatedSkills[index] = { ...skill, category: e.target.value as any };
                      setEditData({ ...editData, skills: updatedSkills });
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="technical">Technical</option>
                    <option value="soft">Soft Skills</option>
                    <option value="language">Language</option>
                    <option value="certification">Certification</option>
                  </select>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={skill.level || 3}
                    onChange={(e) => {
                      const updatedSkills = [...editData.skills];
                      updatedSkills[index] = { ...skill, level: parseInt(e.target.value) };
                      setEditData({ ...editData, skills: updatedSkills });
                    }}
                    className="w-20"
                  />
                  <span className="text-sm text-gray-500 w-8">{skill.level}/5</span>
                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="text-red-600 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {cvData.skills.map((skill) => (
                <div key={skill.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-900">{skill.name}</span>
                    <span className="text-xs text-gray-500 uppercase">{skill.category}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((skill.level || 3) / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{skill.level}/5</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
        >
          Choose Template
        </button>
      </div>
    </div>
  );
};