<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home');
})->name('home');

Route::get('/about', function () {
    return view('about');
})->name('about');

Route::get('/contact', function () {
    return view('contact');
})->name('contact');

Route::post('/contact/submit', 'ContactController@submitAction')->name('contact-form');
Route::get('/contact/all', 'ContactController@allData')->name('contact-all');
Route::get('/contact/{id}', 'ContactController@viewContact')->name('contact-view');
Route::get('/contact/{id}/update', 'ContactController@updateContact')->name('contact-update');
Route::post('/contact/{id}/update', 'ContactController@saveUpdateContact')->name('contact-save-update');
Route::get('/contact/{id}/delete', 'ContactController@deleteContact')->name('contact-delete');
