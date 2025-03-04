"use client"

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { nanoid } from 'nanoid';
import { Trash2, Edit, FileText, Image, Save, X, Plus } from 'lucide-react';

interface Material {
  id: string;
  name: string;
  desc: string;
  category: string;
  appearance?: string;
  pdf_link: string;
  image_link: string | null;
}

// Define available categories
const CATEGORIES = ["fragrance", "raw-material", "Artificial coloring"];

export default function Home() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [newMaterialForm, setNewMaterialForm] = useState({
    name: '',
    desc: '',
    category: '',
    appearance: '',
    pdf: null as File | null,
    image: null as File | null,
  });
  const [editForms, setEditForms] = useState<Record<string, {
    name: string;
    desc: string;
    category: string;
    appearance: string;
    pdf: File | null;
    image: File | null;
  }>>({});
  const [loading, setLoading] = useState(false);
  const [editingIds, setEditingIds] = useState<string[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const res = await fetch('https://hamzaserver-production.up.railway.app/api/materials');
      if (!res.ok) throw new Error('Failed to fetch materials');
      const data = await res.json();
      setMaterials(data);
    } catch (err) {
      console.error(err);
      toast({ title: 'Error', description: 'Failed to fetch materials', variant: 'destructive' });
    }
  };

  const handleNewMaterialChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === 'pdf' && files) {
      setNewMaterialForm((prev) => ({ ...prev, pdf: files[0] }));
    } else if (name === 'image' && files) {
      setNewMaterialForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setNewMaterialForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNewMaterialSelectChange = (name: string, value: string) => {
    setNewMaterialForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditFormChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === 'pdf' && files) {
      setEditForms(prev => ({
        ...prev,
        [id]: { ...prev[id], pdf: files[0] }
      }));
    } else if (name === 'image' && files) {
      setEditForms(prev => ({
        ...prev,
        [id]: { ...prev[id], image: files[0] }
      }));
    } else {
      setEditForms(prev => ({
        ...prev,
        [id]: { ...prev[id], [name]: value }
      }));
    }
  };

  const handleEditFormSelectChange = (id: string, name: string, value: string) => {
    setEditForms(prev => ({
      ...prev,
      [id]: { ...prev[id], [name]: value }
    }));
  };

  const sanitizeInput = (input: string) => {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  };

  const resetNewMaterialForm = () => {
    setNewMaterialForm({
      name: '',
      desc: '',
      category: '',
      appearance: '',
      pdf: null,
      image: null,
    });
  };

  const handleAddMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const sanitizedForm = {
      name: sanitizeInput(newMaterialForm.name),
      desc: sanitizeInput(newMaterialForm.desc),
      category: sanitizeInput(newMaterialForm.category),
      appearance: sanitizeInput(newMaterialForm.appearance),
      pdf: newMaterialForm.pdf,
      image: newMaterialForm.image,
    };

    if (!sanitizedForm.name || !sanitizedForm.desc || !sanitizedForm.category) {
      toast({ title: 'Error', description: 'Please fill in all required fields', variant: 'destructive' });
      setLoading(false);
      return;
    }

    if (!sanitizedForm.pdf) {
      toast({ title: 'Error', description: 'Please upload a PDF file', variant: 'destructive' });
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', sanitizedForm.name);
    formData.append('desc', sanitizedForm.desc);
    formData.append('category', sanitizedForm.category);
    if (sanitizedForm.appearance) formData.append('appearance', sanitizedForm.appearance);
    if (sanitizedForm.pdf) formData.append('pdf', sanitizedForm.pdf);
    if (sanitizedForm.image) formData.append('image', sanitizedForm.image);

    try {
      const res = await fetch('https://hamzaserver-production.up.railway.app/api/materials', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to add material');
      
      await fetchMaterials();
      resetNewMaterialForm();
      setShowAddForm(false);
      toast({ title: 'Success', description: 'Material added successfully', variant: 'default' });
    } catch (err) {
      console.error(err);
      toast({ 
        title: 'Error', 
        description: 'Failed to add material', 
        variant: 'destructive' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this material?')) return;
    
    setLoading(true);
    try {
      const res = await fetch(`https://hamzaserver-production.up.railway.app/api/materials/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete material');

      setMaterials((prev) => prev.filter((m) => m.id !== id));
      toast({ title: 'Success', description: 'Material deleted successfully', variant: 'default' });
    } catch (err) {
      console.error(err);
      toast({ title: 'Error', description: 'Failed to delete material', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (material: Material) => {
    // If already editing, cancel edit
    if (editingIds.includes(material.id)) {
      setEditingIds(prev => prev.filter(id => id !== material.id));
      setEditForms(prev => {
        const newForms = { ...prev };
        delete newForms[material.id];
        return newForms;
      });
      return;
    }
    
    // Start editing
    setEditingIds(prev => [...prev, material.id]);
    setEditForms(prev => ({
      ...prev,
      [material.id]: {
        name: material.name,
        desc: material.desc,
        category: material.category,
        appearance: material.appearance || '',
        pdf: null,
        image: null,
      }
    }));
  };

  const handleSaveEdit = async (id: string) => {
    setLoading(true);
    
    const editForm = editForms[id];
    if (!editForm) return;
    
    const sanitizedForm = {
      name: sanitizeInput(editForm.name),
      desc: sanitizeInput(editForm.desc),
      category: sanitizeInput(editForm.category),
      appearance: sanitizeInput(editForm.appearance),
      pdf: editForm.pdf,
      image: editForm.image,
    };

    if (!sanitizedForm.name || !sanitizedForm.desc || !sanitizedForm.category) {
      toast({ title: 'Error', description: 'Please fill in all required fields', variant: 'destructive' });
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', sanitizedForm.name);
    formData.append('desc', sanitizedForm.desc);
    formData.append('category', sanitizedForm.category);
    if (sanitizedForm.appearance) formData.append('appearance', sanitizedForm.appearance);
    if (sanitizedForm.pdf) formData.append('pdf', sanitizedForm.pdf);
    if (sanitizedForm.image) formData.append('image', sanitizedForm.image);

    try {
      const res = await fetch(`https://hamzaserver-production.up.railway.app/api/materials/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to update material');
      
      await fetchMaterials();
      
      // Remove from editing state
      setEditingIds(prev => prev.filter(editId => editId !== id));
      setEditForms(prev => {
        const newForms = { ...prev };
        delete newForms[id];
        return newForms;
      });
      
      toast({ title: 'Success', description: 'Material updated successfully', variant: 'default' });
    } catch (err) {
      console.error(err);
      toast({ 
        title: 'Error', 
        description: 'Failed to update material', 
        variant: 'destructive' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen my-20">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Materials Dashboard</h1>
        
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2"
        >
          {showAddForm ? (
            <>Hide Add Form <X size={16} /></>
          ) : (
            <>Add New Material <Plus size={16} /></>
          )}
        </Button>
      </div>
      
      {showAddForm && (
        <Card className="w-full mb-8">
          <CardHeader>
            <CardTitle>Add New Material</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddMaterial} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Material Name*</label>
                <Input
                  id="name"
                  name="name"
                  value={newMaterialForm.name}
                  onChange={handleNewMaterialChange}
                  placeholder="Enter material name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="desc" className="block text-sm font-medium mb-1">Description*</label>
                <Textarea
                  id="desc"
                  name="desc"
                  value={newMaterialForm.desc}
                  onChange={handleNewMaterialChange}
                  placeholder="Enter material description"
                  rows={3}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">Category*</label>
                <Select 
                  value={newMaterialForm.category} 
                  onValueChange={(value) => handleNewMaterialSelectChange('category', value)}
                  required
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Show appearance field only for raw-material category */}
              {newMaterialForm.category === 'raw-material' && (
                <div>
                  <label htmlFor="appearance" className="block text-sm font-medium mb-1">Appearance</label>
                  <Textarea
                    id="appearance"
                    name="appearance"
                    value={newMaterialForm.appearance}
                    onChange={handleNewMaterialChange}
                    placeholder="Describe the appearance of the raw material"
                    rows={2}
                  />
                </div>
              )}
              
              <div>
                <label htmlFor="pdf" className="block text-sm font-medium mb-1">PDF File*</label>
                <Input 
                  id="pdf"
                  type="file" 
                  name="pdf" 
                  onChange={handleNewMaterialChange} 
                  accept=".pdf"
                  className="cursor-pointer" 
                  required
                />
              </div>
              
              <div>
                <label htmlFor="image" className="block text-sm font-medium mb-1">
                  Image File (Optional)
                </label>
                <Input 
                  id="image"
                  type="file" 
                  name="image" 
                  onChange={handleNewMaterialChange} 
                  accept="image/*"
                  className="cursor-pointer" 
                />
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  {loading ? 'Processing...' : 'Add Material'}
                  {!loading && <Plus size={16} />}
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    resetNewMaterialForm();
                    setShowAddForm(false);
                  }}
                  className="flex items-center gap-2"
                >
                  Cancel
                  <X size={16} />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <h2 className="text-2xl font-bold mb-4">Material List</h2>
      
      {materials.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No materials added yet. Click "Add New Material" to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material) => (
            <Card key={material.id} className="h-full flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-2">
                  {editingIds.includes(material.id) ? (
                    <Input
                      name="name"
                      value={editForms[material.id].name}
                      onChange={(e) => handleEditFormChange(material.id, e)}
                      placeholder="Material Name"
                      required
                    />
                  ) : (
                    material.name
                  )}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-grow">
                {editingIds.includes(material.id) ? (
                  // Edit mode
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Description*</label>
                      <Textarea
                        name="desc"
                        value={editForms[material.id].desc}
                        onChange={(e) => handleEditFormChange(material.id, e)}
                        placeholder="Description"
                        rows={3}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Category*</label>
                      <Select 
                        value={editForms[material.id].category} 
                        onValueChange={(value) => handleEditFormSelectChange(material.id, 'category', value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Show appearance field only for raw-material category */}
                    {editForms[material.id].category === 'raw-material' && (
                      <div>
                        <label className="block text-sm font-medium mb-1">Appearance</label>
                        <Textarea
                          name="appearance"
                          value={editForms[material.id].appearance}
                          onChange={(e) => handleEditFormChange(material.id, e)}
                          placeholder="Describe the appearance of the raw material"
                          rows={2}
                        />
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        PDF File (Leave empty to keep existing)
                      </label>
                      <Input 
                        type="file" 
                        name="pdf" 
                        onChange={(e) => handleEditFormChange(material.id, e)} 
                        accept=".pdf"
                        className="cursor-pointer"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Image File (Optional)
                      </label>
                      <Input 
                        type="file" 
                        name="image" 
                        onChange={(e) => handleEditFormChange(material.id, e)} 
                        accept="image/*"
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                ) : (
                  // View mode
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm line-clamp-3">{material.desc}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {material.category}
                      </span>
                    </div>
                    
                    {/* Display appearance for raw-material category */}
                    {material.category === 'raw-material' && material.appearance && (
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-xs font-medium text-gray-700 mb-1">Appearance:</p>
                        <p className="text-sm">{material.appearance}</p>
                      </div>
                    )}
                    
                    <div className="flex flex-col gap-2 pt-2">
                      {material.pdf_link && (
                        <a 
                          href={material.pdf_link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center gap-1"
                        >
                          <FileText size={14} /> View PDF
                        </a>
                      )}
                      
                      {material.image_link && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                            <Image size={14} /> Preview Image:
                          </p>
                          <img 
                            src={material.image_link} 
                            alt={material.name} 
                            className="max-h-32 rounded-md object-contain bg-gray-50"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="border-t pt-4 flex justify-between gap-2">
                {editingIds.includes(material.id) ? (
                  <>
                    <Button 
                      onClick={() => handleSaveEdit(material.id)} 
                      variant="default"
                      className="flex-1 flex items-center justify-center gap-1"
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save'}
                      {!loading && <Save size={16} />}
                    </Button>
                    
                    <Button 
                      onClick={() => handleEdit(material)} 
                      variant="outline"
                      className="flex-1 flex items-center justify-center gap-1"
                    >
                      Cancel <X size={16} />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      onClick={() => handleEdit(material)} 
                      variant="outline"
                      className="flex-1 flex items-center justify-center gap-1"
                    >
                      Edit <Edit size={16} />
                    </Button>
                    
                    <Button 
                      onClick={() => handleDelete(material.id)} 
                      variant="destructive"
                      className="flex-1 flex items-center justify-center gap-1"
                    >
                      Delete <Trash2 size={16} />
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}