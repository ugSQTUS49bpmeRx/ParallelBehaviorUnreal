import React, { useState, ChangeEvent } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Globe, X, Phone, MapPin } from "lucide-react";

interface DoctorProfileProps {
  initialData?: {
    name: string;
    specialty: string;
    bio: string;
    photo: string;
    website: string;
    phone?: string;
    address?: string;
  };
  onSave?: (data: {
    name: string;
    specialty: string;
    bio: string;
    photo: string;
    website: string;
    phone?: string;
    address?: string;
  }) => void;
  isEditable?: boolean;
}

const DoctorProfile = ({
  initialData = {
    name: "د. محمد العلي",
    specialty: "طب عام",
    bio: "طبيب عام مع خبرة واسعة في الرعاية الصحية الأولية والطب الوقائي.",
    photo:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&h=300&auto=format&fit=crop",
    website: "https://example.com/dr-ali",
    phone: "+966 11 234 5678",
    address: "شارع الملك فهد، الرياض",
  },
  onSave = () => {},
  isEditable = true,
}: DoctorProfileProps) => {
  const [name, setName] = useState(initialData.name);
  const [specialty, setSpecialty] = useState(initialData.specialty);
  const [bio, setBio] = useState(initialData.bio);
  const [photo, setPhoto] = useState(initialData.photo);
  const [website, setWebsite] = useState(initialData.website);
  const [phone, setPhone] = useState(initialData.phone || "");
  const [address, setAddress] = useState(initialData.address || "");
  const [isEditing, setIsEditing] = useState(false);

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPhoto(imageUrl);
    }
  };

  const handleSave = () => {
    onSave({ name, specialty, bio, photo, website, phone, address });
    setIsEditing(false);
  };

  const handleClearPhoto = () => {
    setPhoto("");
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          {isEditing ? "تعديل الملف الشخصي" : name || "الملف الشخصي للطبيب"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">الاسم الكامل</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="د. محمد العلي"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialty">التخصص</Label>
              <Input
                id="specialty"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                placeholder="طب القلب"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">السيرة الذاتية</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="نبذة مختصرة عن الخبرة المهنية"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+966 11 234 5678"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">العنوان</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="شارع الملك فهد، الرياض"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">الموقع الإلكتروني</Label>
              <Input
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">الصورة الشخصية</Label>
              <div className="flex items-center gap-4">
                {photo && (
                  <div className="relative">
                    <img
                      src={photo}
                      alt="صورة الطبيب"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                      onClick={handleClearPhoto}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                <div className="flex-1">
                  <Label
                    htmlFor="photo-upload"
                    className="flex items-center justify-center w-full h-10 px-4 py-2 text-sm border rounded-md cursor-pointer bg-muted hover:bg-muted/80"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    رفع صورة
                  </Label>
                  <Input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {photo ? (
                <img
                  src={photo}
                  alt={name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-2xl font-bold text-muted-foreground">
                  {name ? name.charAt(0) : "؟"}
                </div>
              )}
              <div>
                <h3 className="text-lg font-bold">{name || "اسم الطبيب"}</h3>
                <p className="text-muted-foreground">{specialty || "التخصص"}</p>
                {website && (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-blue-600 hover:underline mt-1"
                  >
                    <Globe className="h-3 w-3 ml-1" />
                    الموقع الإلكتروني
                  </a>
                )}
              </div>
            </div>

            {bio && (
              <div>
                <h4 className="text-sm font-medium mb-1">السيرة الذاتية</h4>
                <p className="text-sm text-muted-foreground">{bio}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
      {isEditable && (
        <CardFooter className="flex justify-end">
          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                إلغاء
              </Button>
              <Button onClick={handleSave}>حفظ الملف</Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)}>تعديل الملف</Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default DoctorProfile;
