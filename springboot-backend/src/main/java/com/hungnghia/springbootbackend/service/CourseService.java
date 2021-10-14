package com.hungnghia.springbootbackend.service;
import com.hungnghia.springbootbackend.converter.CourseConverter;
import com.hungnghia.springbootbackend.dto.CourseDto;
import com.hungnghia.springbootbackend.entities.CourseEntity;
import com.hungnghia.springbootbackend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService  {
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private CourseConverter courseConverter;

    public CourseDto addCourse(CourseDto course) {
        CourseEntity courseEntity = courseConverter.toEntity(course);

        CourseEntity courseResult = courseRepository.save(courseEntity);
        return courseConverter.toDto(courseResult);
    }

    public CourseDto updateCourse(CourseDto newCourse) {
        CourseEntity newCourseEntity = courseConverter.toEntity(newCourse);
        CourseEntity oldCourseEntity = courseRepository.getById(newCourse.getId());
        if (newCourseEntity.getName() == null) {
            newCourseEntity.setName(oldCourseEntity.getName());
        }
        if (newCourseEntity.getImage() ==null) {
            newCourseEntity.setImage(oldCourseEntity.getImage());
        }
        if (newCourseEntity.getIntroduce() == null) {
            newCourseEntity.setImage(oldCourseEntity.getIntroduce());
        }
        if (newCourseEntity.getChapterEntityList() ==null) {
            newCourseEntity.setChapterEntityList(oldCourseEntity.getChapterEntityList());
        }
        if (newCourseEntity.getUser_course_entityList() ==null) {
            newCourseEntity.setUser_course_entityList(oldCourseEntity.getUser_course_entityList());
        }
        CourseEntity courseResult = courseRepository.save(newCourseEntity);
        return courseConverter.toDto(courseResult);
    }


    public List<CourseDto> getAllCourse() {
        List<CourseEntity> lstCourseEntity = courseRepository.findAll();
        return courseConverter.toListDto(lstCourseEntity);
    }

}
