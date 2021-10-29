package com.hungnghia.springbootbackend.controller;

import com.hungnghia.springbootbackend.dto.MailDto;
import com.hungnghia.springbootbackend.dto.MissPassWordDto;
import com.hungnghia.springbootbackend.dto.UserDto;
import com.hungnghia.springbootbackend.entities.UserEntity;
import com.hungnghia.springbootbackend.service.MailService;
import com.hungnghia.springbootbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;


@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;
    private final MailService mailService;

    @Autowired
    public UserController(UserService userService, MailService mailService){
        this.userService = userService;
        this.mailService = mailService;
    }

    /*Get all user*/
    @GetMapping("/users")
    public List<UserEntity> getAllUsers() {
        return userService.getUsers();
    }

    /*Add user*/
    @PostMapping("/users")
    public UserEntity addUser(@RequestPart("userDto") UserDto userDto, @RequestPart("file") MultipartFile file){
        return userService.addUser(userDto, file);
    }

    /*Delete User*/
    @DeleteMapping("/users/{id}")
    public ResponseEntity<UserEntity> deleteUser(@PathVariable Long id){
        UserEntity userEntity = userService.deleteUser(id);
        return ResponseEntity.ok(userEntity);
    }

    /*Edit User*/
    @PutMapping("/users/{id}")
    public ResponseEntity<UserEntity> updateUser(@PathVariable Long id, @RequestPart("userDto") UserDto userDto, @RequestPart("file") MultipartFile file){
        UserEntity updateUser = userService.updateUser(id, userDto, file);
        return ResponseEntity.ok(updateUser);
    }

    @PutMapping("/users/edit2/{id}")
    public ResponseEntity<UserEntity> updateUser(@PathVariable Long id, @RequestBody UserDto userDto){
        UserEntity updateUser = userService.updateUser(id, userDto, null);
        return ResponseEntity.ok(updateUser);
    }

    /*Get User with id*/
    @GetMapping("/users/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable Long id){
        UserEntity userEntity = userService.getUser(id);
        return ResponseEntity.ok(userEntity);
    }

    @PostMapping("/users/check-username-email")
    public ResponseEntity<String> checkUsernameEmail (@RequestBody MissPassWordDto missPassWordDto){
        if(userService.checkUsernameEmail(missPassWordDto.getUsername(), missPassWordDto.getEmail()) != null){

            /*generatePassword*/
            char[] pass = userService.generatePassword(6);
            String newPass = new String(pass);

            /*Update password*/
            userService.updatePassWord(missPassWordDto.getUsername(), newPass);

            /*Send mail password to user*/
            MailDto mailDto = new MailDto();
            mailDto.setMailFrom("websitehoctienganhtructuye@gmail.com");
            mailDto.setMailTo("hungduong.mess32@gmail.com");
            mailDto.setMailSubject("Mật khẩu mới !!!!");
            mailDto.setMailContent("Đây là mật khẩu mới của bạn : " + newPass + " !!!! Hãy đăng nhập và đổi lại mật khẩu.");
            mailService.sendEmail(mailDto);
            return new ResponseEntity<>("Gửi email thành công !", HttpStatus.OK);
        }

        return new ResponseEntity<>("Tên đăng nhập hoặc email không chính xác !!!",HttpStatus.BAD_REQUEST);
    }

}
