<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required',
            'subject' => 'required|min:4|max:10',
            'message' => 'required|min:16|max:100',
            'email' => 'required|email',
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'Your name',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Your name is require.',
        ];
    }
}
