import React, { useState, useEffect } from "react";
import { Search, MapPin, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  address: string;
  phone: string;
  bio: string;
  photo: string;
  website?: string;
}

interface DoctorDirectoryProps {
  initialDoctors?: Doctor[];
  onDoctorSelect?: (doctor: Doctor) => void;
}

const DoctorDirectory = ({
  initialDoctors = [
    {
      id: "1",
      name: "د. سارة الأحمد",
      specialty: "طب القلب",
      location: "المركز الرئيسي",
      address: "شارع الملك فهد، الرياض",
      phone: "+966 11 234 5678",
      bio: "استشارية أمراض القلب مع خبرة تزيد عن 15 عاماً في علاج أمراض القلب والشرايين. متخصصة في الوقاية من أمراض القلب وعلاج قصور القلب.",
      photo:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&h=300&auto=format&fit=crop",
      website: "https://example.com/dr-sarah",
    },
    {
      id: "2",
      name: "د. محمد العلي",
      specialty: "طب الأعصاب",
      location: "فرع الشمال",
      address: "طريق الملك عبدالله، الرياض",
      phone: "+966 11 987 6543",
      bio: "استشاري أمراض الأعصاب متخصص في اضطرابات الحركة والأمراض العصبية التنكسية. أكمل زمالته في مايو كلينك ونشر العديد من الأبحاث العلمية.",
      photo:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&h=300&auto=format&fit=crop",
      website: "https://example.com/dr-mohammed",
    },
    {
      id: "3",
      name: "د. فاطمة الزهراني",
      specialty: "طب الأطفال",
      location: "المركز الرئيسي",
      address: "شارع الملك فهد، الرياض",
      phone: "+966 11 345 6789",
      bio: "طبيبة أطفال متخصصة في تقديم الرعاية الشاملة للأطفال من الولادة وحتى سن المراهقة. لديها اهتمام خاص بتطور الطفل والتغذية.",
      photo:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=300&h=300&auto=format&fit=crop",
      website: "https://example.com/dr-fatima",
    },
    {
      id: "4",
      name: "د. خالد المنصور",
      specialty: "طب العيون",
      location: "فرع الغرب",
      address: "طريق المدينة المنورة، جدة",
      phone: "+966 12 345 6789",
      bio: "استشاري طب وجراحة العيون مع خبرة واسعة في علاج أمراض العيون وجراحات الليزك. حاصل على شهادات متقدمة في جراحة المياه البيضاء والزرقاء.",
      photo:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300&h=300&auto=format&fit=crop",
      website: "https://example.com/dr-khalid",
    },
    {
      id: "5",
      name: "د. نورة القحطاني",
      specialty: "طب الجلدية",
      location: "فرع الشرق",
      address: "طريق الظهران، الدمام",
      phone: "+966 13 456 7890",
      bio: "استشارية الأمراض الجلدية والتجميل مع خبرة خاصة في علاج حب الشباب والأكزيما والصدفية. متخصصة في إجراءات التجميل غير الجراحية.",
      photo:
        "https://images.unsplash.com/photo-1623854767648-e7bb8009f0db?q=80&w=300&h=300&auto=format&fit=crop",
      website: "https://example.com/dr-noura",
    },
  ],
  onDoctorSelect = () => {},
}: DoctorDirectoryProps) => {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [filteredDoctors, setFilteredDoctors] =
    useState<Doctor[]>(initialDoctors);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  // Extract unique specialties and locations for filters
  const specialties = [...new Set(doctors.map((doctor) => doctor.specialty))];
  const locations = [...new Set(doctors.map((doctor) => doctor.location))];

  // Apply filters when search term, specialty, or location changes
  useEffect(() => {
    let results = doctors;

    // Filter by search term
    if (searchTerm) {
      results = results.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by specialty
    if (selectedSpecialty) {
      results = results.filter(
        (doctor) => doctor.specialty === selectedSpecialty,
      );
    }

    // Filter by location
    if (selectedLocation) {
      results = results.filter(
        (doctor) => doctor.location === selectedLocation,
      );
    }

    setFilteredDoctors(results);
  }, [searchTerm, selectedSpecialty, selectedLocation, doctors]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSpecialty("");
    setSelectedLocation("");
  };

  return (
    <div className="w-full bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">دليل الأطباء</h1>
          <p className="text-gray-600">
            تعرف على فريقنا الطبي المتميز واحجز موعدك مع الطبيب المناسب لحالتك
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="ابحث عن طبيب أو تخصص..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={selectedSpecialty}
              onValueChange={setSelectedSpecialty}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="التخصص" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">جميع التخصصات</SelectItem>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedLocation}
              onValueChange={setSelectedLocation}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="الموقع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">جميع المواقع</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {(searchTerm || selectedSpecialty || selectedLocation) && (
              <Button variant="ghost" onClick={clearFilters} className="px-3">
                <X className="h-4 w-4 mr-2" />
                مسح
              </Button>
            )}
          </div>
        </div>

        {/* Active filters */}
        {(selectedSpecialty || selectedLocation) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedSpecialty && (
              <Badge variant="secondary" className="px-3 py-1">
                {selectedSpecialty}
                <button
                  className="ml-2"
                  onClick={() => setSelectedSpecialty("")}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedLocation && (
              <Badge variant="secondary" className="px-3 py-1">
                {selectedLocation}
                <button
                  className="ml-2"
                  onClick={() => setSelectedLocation("")}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}

        {/* Results count */}
        <div className="mb-6">
          <p className="text-sm text-gray-500">
            {filteredDoctors.length}{" "}
            {filteredDoctors.length === 1 ? "طبيب" : "أطباء"}
          </p>
        </div>

        {/* Doctor grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <Card
                key={doctor.id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col">
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={doctor.photo}
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-bold mb-1">{doctor.name}</h3>
                      <p className="text-primary mb-2">{doctor.specialty}</p>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {doctor.bio}
                      </p>

                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 ml-1" />
                        <span>{doctor.location}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">العنوان:</span>{" "}
                        {doctor.address}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">هاتف:</span>{" "}
                        {doctor.phone}
                      </div>
                    </div>
                    <div className="mt-auto p-4 pt-0">
                      <Button
                        className="w-full"
                        onClick={() => onDoctorSelect(doctor)}
                      >
                        حجز موعد
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 mb-4">
                لم يتم العثور على أطباء مطابقين للبحث
              </p>
              <Button onClick={clearFilters}>عرض جميع الأطباء</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDirectory;
